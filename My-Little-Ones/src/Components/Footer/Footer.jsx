import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import footer_logo from "../Assets/logo.jpg";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img
          src={footer_logo}
          alt="logo"
          style={{ width: "60px", height: "60px", objectFit: "contain" }}
        />
        <p>MY LITTLE ONES</p>
      </div>
      <div className="footer-links-container">
        <ul className="footer-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
        <ul className="footer-links">
          <li>
            <Link to="/boy_clothes">Boy Clothes</Link>
          </li>
          <li>
            <Link to="/girl_clothes">Girl Clothes</Link>
          </li>
          <li>
            <Link to="/newborn_clothes">Newborn Clothes</Link>
          </li>
          <li>
            <Link to="/maternity_clothes">Maternity Clothes</Link>
          </li>
        </ul>
        <ul className="footer-links">
          <li>
            <Link to="/shoes">Shoes</Link>
          </li>
          <li>
            <Link to="/toys">Toys</Link>
          </li>
          <li>
            <Link to="/feeding">Feeding</Link>
          </li>
          <li>
            <Link to="/maternity_care">Maternity Care</Link>
          </li>
          <li>
            <Link to="/furniture">Furniture</Link>
          </li>
        </ul>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @2024 - All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
