import React from "react";
import "./Navbar.scss";
import Cam from "../../img/camera.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { user, error, loading, message } = useSelector((state) => state.auth);
  console.log(user?.payload)


  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };
  const handleLogout = () => {

    localStorage.removeItem("user");
    dispatch(logOut(user));
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
          {user?.payload?._id ? (
            <button className="button login" onClick={handleLogout}>
              Logout
            </button>
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
