import React, { useState } from "react";
import "./Signup.css";
import leftbc from "../../Images/leftbc.png";
import splashlogo from "../../Images/splash-logo.png";
import logo from "../../Images/logo.png";
import google from "../../Images/googleicon";
import fb from "../../Images/fb";
import { signUp } from "../../Api/AuthRequest";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signup = () => {
  //user state
  const [user, setData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmpass: "",
  });
  const [confirmPass, setConfirmPass] = useState(true);

  //handle input change
  const handleChange = (e) => {
    setData({ ...user, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  console.log(user);
  //form sunmit to server
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.username === "" || user.email === "" || user.phone === "") {
      toast.error("Fields can't be empty");
    } else if (user.phone.length < 10 || isNaN(user.phone)) {
      toast.error("Enter valid Phone number");
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)
    ) {
      toast.error("Enter valid email id");
    } else if (user.password !== user.confirmpass) {
      toast.error("Password dosen't match");
    } else {
      try {
        const { data } = await signUp(user);
        console.log(data);
        localStorage.setItem("userInfo", data);
        resetForm();
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };
  //resetting form
  const resetForm = () => {
    setConfirmPass(true);
    setData({
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmpass: "",
    });
  };

  return (
    <div>
      <div className="signup_container">
        <div className="signup_form_container">
          <div className="left">
            <img
              src={leftbc}
              style={{ height: "100%", width: "100%", marginTop: "-7rem" }}
              alt=""
            />
            <img src={splashlogo} alt="" className="logo" />
          </div>
          <div className="styles.right">
            <form className="form_container" onSubmit={handleSubmit}>
              <img
                src={logo}
                style={{ width: "4rem", marginTop: "10px" }}
                alt=""
              />
              <h2 style={{ marginTop: "-2px", color: "#D59500" }}>SIGNUP</h2>

              <input
                type="text"
                placeholder="NAME"
                name="username"
                value={user.username}
                onChange={handleChange}
                className="input2"
              />
              <input
                type="text"
                placeholder="ENTER YOUR EMAIL"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="input2"
              />

              <input
                type="text"
                placeholder="ENTER YOUR MOBILE"
                name="phone"
                onChange={handleChange}
                value={user.phone}
                className="input2"
              />

              <input
                type="password"
                placeholder="PASSWORD"
                name="password"
                onChange={handleChange}
                value={user.password}
                className="input2"
              />
              <input
                type="password"
                placeholder="CONFIRM PASSWORD"
                name="confirmpass"
                onChange={handleChange}
                value={user.confirmpass}
                className="input2"
              />
              <div className="check">
                <input
                  type="checkbox"
                  name="privacyPolicy"
                  id=""
                  value={true}
                  onChange={handleChange}
                />
                <span style={{ fontSize: "10px", marginTop: "2px" }}>
                  {" "}
                  I AGREE TO THE PRIVACY POLICY
                </span>
              </div>

              <button type="submit" className="gold_btn">
                SUBMIT
              </button>
            </form>
            <h4 style={{ color: "#D59500", marginLeft: "6.5rem" }}>
              SIGN UP WITH
            </h4>
            <div className="auth">
              <img
                src={google}
                style={{
                  width: "2rem",
                  marginRight: "10px",
                  marginBottom: "20px",
                }}
                alt=""
              />
              <img
                src={fb}
                style={{
                  width: "3.5rem",
                  marginLeft: "10px",
                  marginBottom: "20px",
                }}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
