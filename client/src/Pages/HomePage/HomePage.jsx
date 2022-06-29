import React, { useState } from "react";
import "./HomePage.css";
import splashlogo from "../../Images/splash-logo.png";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const HomePage = () => {
  const [userInfo, setInfo] = useState();
  const navigate = useNavigate();
  
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setInfo(userInfo);
      navigate("/");
      toast.success("LOGGED IN");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <>
        <div className="main_container">
          <nav className="navbar">
            <img
              src={splashlogo}
              style={{ width: "4rem", marginTop: "10px" }}
              alt=""
            />
            <button
              className="white_btn"
              onClick={(e) => {
                e.preventDefault();
                swal({
                  title: "Are you sure?",
                  text: "Do yo want to logout!",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                }).then((willDelete) => {
                  if (willDelete) {
                    localStorage.removeItem("userInfo");

                    navigate("/login");
                  } else {
                    swal("Welcome back");
                  }
                });
              }}
            >
              Logout
            </button>
          </nav>
        </div>
        <div className="login_containers">
          <div className="login_form_container">
            <div className="left">
              <h1 style={{ color: "#D59500" }}>Welcome Home ....! </h1>
            </div>
          </div>
        </div>
      </>
      <ToastContainer />
    </div>
  );
};

export default HomePage;
