import React from "react";
import "./Navbar.scss";
import Cam from "../../img/camera.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/authSlice";
import { remove } from "../../redux/searchSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };
  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.setItem("user", null);
    navigate("/");
    dispatch(logOut(currentUser));
    dispatch(remove());
  };
  return (
    <div className="navbar">
      <div className="container">
        <div className="img">
          <img src={Cam} alt="" />
        </div>

        <div className="title">
          <h1>Vloguider</h1>
        </div>
        <div className="user">
          {currentUser ? (
            <>

              <button className="button login" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="button login" onClick={handleLogin}>
                Login
              </button>
              <button className="button register" onClick={handleRegister}>
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
