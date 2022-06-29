import React, { useEffect, useState } from "react";
import "./Otp.css";
import leftbc from "../../Images/leftbc.png";
import splashlogo from "../../Images/splash-logo.png";
import logo from "../../Images/logo.png";
import { otpConfirm, otpLogin } from "../../Api/AuthRequest";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Otp = () => {
  const userInfo = localStorage.getItem("userInfo");
  const [submitPhone, setSubmitPhone] = useState(false);
  const [errorsphone, setError] = useState(false);

  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    setNumber(event.target.value);
  };
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate]);
  const handleClick = async (e) => {
    e.preventDefault();
    console.log(number);
    if (number === null || number.length < 10 || isNaN(number)) {
      setError(true);
    } else {
      const { data } = await otpLogin({ number });
      toast("OTP SENT TO YOUR MOBILE !");
      console.log(data);
      setSubmitPhone(true);
    }
  };

  const onChange = (event) => {
    setOtp(event.target.value);
  };

  const onClick = async (e) => {
    e.preventDefault();
    console.log(otp);
    const { data } = await otpConfirm({ otp, number });
    if (data.valid === true) {
      localStorage.setItem("userInfo", data);
      toast.success("Logged In successfuly");
      navigate("/");
    } else {
      toast.warn("Incorrect OTP");
    }
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
          <form className="form_container">
            <img
              src={logo}
              style={{ width: "4rem", marginTop: "10px" }}
              alt=""
            />
            <h2 style={{ marginTop: "-2px", color: "#D59500" }}>
              LOGIN WITH OTP
            </h2>

            {submitPhone === false && (
              <>
                <input
                  type="text"
                  placeholder="ENTER YOUR MOBILE"
                  name="mobile"
                  value={number}
                  onChange={handleChange}
                  className="input"
                />
                {errorsphone && (
                  <p style={{ color: "red" }}>enter valid mobile number.</p>
                )}
                <div className="buttons">
                  <button
                    type="submit"
                    className="gold_btn"
                    onClick={handleClick}
                  >
                    SEND OTP
                  </button>
                </div>
              </>
            )}

            {submitPhone && (
              <>
                <input
                  type="otp"
                  placeholder="ENTER YOUR OTP"
                  name="password"
                  onChange={onChange}
                  required
                  className="input"
                  value={otp}
                />

                <div className="buttons">
                  <button type="submit" className="gold_btn" onClick={onClick}>
                    SUBMIT
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Otp;
