import React, { useState, useRef, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../Assets/logo.jpg";
import cart_icon from "../Assets/cart.jpg";
import profile_icon from "../Assets/navProfile.jpg";
import nav_dropdown from "../Assets/nav_dropdown.png";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const userType = localStorage.getItem("userType");
  const [menu, setMenu] = useState("home");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isClothesDropdownVisible, setIsClothesDropdownVisible] =
    useState(false);
  const menuRef = useRef();
  const location = useLocation(); // Hook to get current path

  const dropdown_toggle = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const clothesDropdown_toggle = () => {
    setIsClothesDropdownVisible(!isClothesDropdownVisible);
  };

  const { getTotalCartItems } = useContext(ShopContext);

  // Function to check if the menu item is active
  const isActive = (path) => location.pathname === path;

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
        <li className={isActive("/") ? "active" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li className={isActive("/about") ? "active" : ""}>
          <Link to="/about">About</Link>
        </li>
        <li
          className={isActive("/clothes") ? "active" : ""}
          onClick={clothesDropdown_toggle}
        >
          <span>Clothes</span>
          <ul
            className={`nav-submenu ${
              isClothesDropdownVisible ? "nav-submenu-visible" : ""
            }`}
          >
            <li className={isActive("/boy_clothes") ? "active" : ""}>
              <Link to="/boy_clothes">Boy Clothes</Link>
            </li>
            <li className={isActive("/girl_clothes") ? "active" : ""}>
              <Link to="/girl_clothes">Girl Clothes</Link>
            </li>
            <li className={isActive("/newborn_clothes") ? "active" : ""}>
              <Link to="/newborn_clothes">Newborn Clothes</Link>
            </li>
            <li className={isActive("/maternity_clothes") ? "active" : ""}>
              <Link to="/maternity_clothes">Maternity Clothes</Link>
            </li>
          </ul>
        </li>
        <li className={isActive("/shoes") ? "active" : ""}>
          <Link to="/shoes">Shoes</Link>
        </li>
        <li className={isActive("/toys") ? "active" : ""}>
          <Link to="/toys">Toys</Link>
        </li>
        <li className={isActive("/feeding") ? "active" : ""}>
          <Link to="/feeding">Feeding</Link>
        </li>
        <li className={isActive("/maternity_care") ? "active" : ""}>
          <Link to="/maternity_care">Maternity Care</Link>
        </li>
        <li className={isActive("/furniture") ? "active" : ""}>
          <Link to="/furniture">Furniture</Link>
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
        <Link to={userType === "admin" ? "/admin/addproduct" : "/cart"}>
          <img
            src={userType === "admin" ? profile_icon : cart_icon}
            alt={userType === "admin" ? "manage" : "cart"}
            className="cart-icon"
          />
        </Link>
        {userType !== "admin" && (
          <div className="nav-cart-count">{getTotalCartItems()}</div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
