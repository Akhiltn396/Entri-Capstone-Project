import React from "react";
import "./Navbar.scss";
import Cam from "../../img/camera.png";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();

const handleLogin = () =>{
navigate("/login")
}

const handleRegister = () =>{
navigate("/register")
}

  return (
    <div className="navbar">
      <div className="container">
        <div className="img">
          <img src={Cam} alt="" />
        </div>

        <div className="title">
          <h1>Vlogiffy</h1>
        </div>
        <div className="user">
            <button className="button login" onClick={handleLogin}>Login</button>
            <button className="button register" onClick={handleRegister}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
