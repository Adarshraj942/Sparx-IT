import React, { useState } from "react";
import leftbc from "../../Images/leftbc.png";
import splashlogo from "../../Images/splash-logo.png";
import logo from "../../Images/logo.png";

import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { login, signUp } from "../../Api/AuthRequest";
import { useEffect } from "react";
import { useGoogleOneTapLogin } from "react-google-one-tap-login";
import FacebookLogin from "react-facebook-login";
const Login = () => {
  const userInfo = localStorage.getItem("userInfo");

  const [user, setData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setData({ ...user, [e.target.name]: e.target.value });
  };
  //one tap google login
  useGoogleOneTapLogin({
    onSuccess: (response) => {
      localStorage.setItem("userInfo", response);
      navigate("/");
    },
    onError: (error) => console.log(error),
    googleAccountConfigs: {
      client_id:
        "820965083830-suli7t5b5bul27109gngq9i9ks8fsv9e.apps.googleusercontent.com",
    },
  });
  //form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.username === "") {
      setError2(true);
    } else {
      try {
        const { data } = await login(user);
        console.log(data);
        localStorage.setItem("userInfo", data);
        resetForm();
        navigate("/");
      } catch (error) {
        console.log(error);
        setError(true);
      }
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate]);

  const resetForm = () => {
    setConfirmPass(true);
    setData({ username: "", email: "", phone: "", password: "" });
  };
  const [confirmPass, setConfirmPass] = useState(true);

  //fb login button
  const responseFacebook = (response) => {
    if (response.accessToken) {
      localStorage.setItem("userInfo", response);
      navigate("/");
    }
  };

  const componentClicked = (data) => {
    console.warn(data);
  };

  return (
    <div className="login_container">
      <div className="login_form_container">
        <div className="left">
          <img
            src={leftbc}
            style={{ height: "100%", width: "100%", marginTop: "-7rem" }}
            alt=""
          />
          <img src={splashlogo} alt="" className="logo" />
        </div>

        <div className="right">
          <form className="form_container" onSubmit={handleSubmit}>
            <img
              src={logo}
              style={{ width: "4rem", marginTop: "10px" }}
              alt=""
            />
            <h2 style={{ marginTop: "-2px", color: "#D59500" }}>LOGIN</h2>

            <input
              type="text"
              placeholder="ENTER YOUR EMAIL/PHONE/USER NAME"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="input"
            />
            {error2 && (
              <span style={{ color: "red" }}>Username is required</span>
            )}
            <input
              type="password"
              placeholder="ENTER YOUR PASSWORD"
              name="password"
              onChange={handleChange}
              value={user.password}
              className="input"
            />

            {error && <span style={{ color: "red" }}> * Wrong password </span>}
            <div className="buttons">
              <button type="submit" className="gold_btn">
                L O G I N
              </button>
              <Link to="/signup">
                <button className="white_btn">S I G N U P</button>
              </Link>
            </div>
          </form>
          <h4 style={{ color: "#D59500" }}>LOGIN WITH</h4>
          <Link to="/otp">
            <span style={{ color: "#D59500" }}>Login with otp</span>
          </Link>
          <FacebookLogin
            appId="327394259598788"
            autoLoad={true}
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass="my-facebook-button-class"
            icon="fa-facebook"
            onClick={componentClicked}
          />
          ,
        </div>
      </div>
      <div className="signInButton"></div>
    </div>
  );
};

export default Login;
