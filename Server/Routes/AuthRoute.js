import express from "express";
import {
  loginUser,
  otpValidation,
  otpVerification,
  registerUser,
} from "../Controllers/AuthControllers.js";

const router = express.Router();

//route for register
router.post("/register", registerUser);
//route for login
router.post("/login", loginUser);
//route for login with otp
router.post("/mobile", otpValidation);
router.post("/otp", otpVerification);

export default router;
