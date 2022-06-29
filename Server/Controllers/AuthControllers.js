import UserModel from "../Model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Twilio from "twilio";

const serviceID = "VA57f1d1f7dce73d525bd565b291b621f7";
const accountSID = "ACebb221f9ba0d8144bfb1565a1679e749";
const authToken = "32716e2725c54bd5817baafccdd4e640";
const client = new Twilio(accountSID, authToken);

//registering a new user
export const registerUser = async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPass;
  }
  const newUser = UserModel(req.body);
  const { username } = req.body;
  console.log(newUser);
  try {
    const oldUser = await UserModel.findOne({ username });
    if (oldUser) {
      return res.status(400).json({ message: "username already exist" });
    }
    const user = await newUser.save();
    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//login User

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  try {
    const user = await UserModel.findOne({ username: username });
    console.log(user.password);
    if (user) {
      const validity = await bcrypt.compare(password, user.password);

      if (!validity) {
        res.status(400).json("Wrong password");
      } else {
        const token = jwt.sign(
          {
            username: user.username,
            id: user._id,
          },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );

        res.status(200).json({ user, token });
      }
    } else {
      res.status(404).json("User does not exist");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//for sending otp
export const otpValidation = async (req, res) => {
  try {
    console.log(req.body.number);
    const resp = await client.verify.services(serviceID).verifications.create({
      to: `+91${req.body.number}`,
      channel: "sms",
    });
    console.log(resp);
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error);
  }
};
//for verifying otp
export const otpVerification = async (req, res) => {
  try {
    const { otp, number } = req.body;
    const resp = await client.verify
      .services(serviceID)
      .verificationChecks.create({
        to: `+91${number}`,
        code: otp,
      });
    console.log(resp);
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error);
  }
};
