import React, { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../Assets/logo.jpg";
import cart_icon from "../Assets/cart.jpg";
import nav_dropdown from "../Assets/nav_dropdown.png";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const userType = localStorage.getItem("userType");
  const [menu, setMenu] = useState("home");
  const [isMenuVisible, setIsMenuVisible] = useState(false); // To handle menu visibility
  const menuRef = useRef();

  const dropdown_toggle = () => {
    setIsMenuVisible(!isMenuVisible); // Toggle the menu visibility
  };

  const { getTotalCartItems } = useContext(ShopContext);

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img
          src={logo}
          alt="logo"
          style={{ width: "50px", height: "50px", objectFit: "contain" }}
        />
        <p style={{ fontSize: "12px" }}>MY LITTLE ONES</p>
      </div>
      <img
        className="nav-dropdown"
        onClick={dropdown_toggle}
        src={nav_dropdown}
        alt="dropdown"
      />
      <ul
        ref={menuRef}
        className={`nav-menu ${isMenuVisible ? "nav-menu-visible" : ""}`}
      >
        <li onClick={() => setMenu("home")}>
          <Link to="/">Home</Link>
          {menu === "home" && <hr />}
        </li>
        <li onClick={() => setMenu("boy_clothes")}>
          <Link to="/boy_clothes">Boy Clothes</Link>
          {menu === "boy_clothes" && <hr />}
        </li>
        <li onClick={() => setMenu("girl_clothes")}>
          <Link to="/girl_clothes">Girl Clothes</Link>
          {menu === "girl_clothes" && <hr />}
        </li>
        <li onClick={() => setMenu("newborn_clothes")}>
          <Link to="/newborn_clothes">Newborn Clothes</Link>
          {menu === "newborn_clothes" && <hr />}
        </li>
        <li onClick={() => setMenu("shoes")}>
          <Link to="/shoes">Shoes</Link>
          {menu === "shoes" && <hr />}
        </li>
        <li onClick={() => setMenu("toys")}>
          <Link to="/toys">Toys</Link>
          {menu === "toys" && <hr />}
        </li>
        <li onClick={() => setMenu("feeding")}>
          <Link to="/feeding">Feeding</Link>
          {menu === "feeding" && <hr />}
        </li>
        <li onClick={() => setMenu("maternity_care")}>
          <Link to="/maternity_care">Maternity Care</Link>
          {menu === "maternity_care" && <hr />}
        </li>
        <li onClick={() => setMenu("furniture")}>
          <Link to="/furniture">Furniture</Link>
          {menu === "furniture" && <hr />}
        </li>
        <li onClick={() => setMenu("maternity_clothes")}>
          <Link to="/maternity_clothes">Maternity Clothes</Link>
          {menu === "maternity_clothes" && <hr />}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
        <Link to="/cart">
          <img
            src={userType === "admin" ? cart_icon : cart_icon}
            alt={userType === "admin" ? "manage" : "cart"}
            className="cart-icon"
          />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
