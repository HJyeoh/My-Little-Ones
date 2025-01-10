import React from "react";
import "./Navbar.css";
import navlogo from "../../assets/navlogo.png";
import navProfile from "../../assets/navProfile.jpg";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={navlogo} alt="" className="nav-logo" />
      <img src={navProfile} alt="" className="nav-profile" />
    </div>
  );
};

export default Navbar;
