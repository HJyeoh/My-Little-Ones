import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/manage" style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img
            src="https://img.icons8.com/ios/452/add.png"
            alt="add"
            width={30}
          />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to="/listproduct" style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img
            src="https://img.icons8.com/ios/452/add.png"
            alt="view"
            width={30}
          />
          <p>Product List</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
