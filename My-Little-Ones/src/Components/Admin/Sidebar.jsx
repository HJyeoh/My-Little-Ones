import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import add_product_icon from "../Assets/addproducticon.png";
import list_product_icon from "../Assets/listproducticon.png";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={"/admin/addproduct"} className="sidebar-link">
        <div className="sidebar-item">
          <img src={add_product_icon} alt="Add Product" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to={"/admin/listproduct"} className="sidebar-link">
        <div className="sidebar-item">
          <img src={list_product_icon} alt="Product List" />
          <p>Product List</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
