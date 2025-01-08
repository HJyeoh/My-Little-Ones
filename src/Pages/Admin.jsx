import React from "react";
import Sidebar from "../Components/Admin/Sidebar";
import "./CSS/Admin.css";
import AddProduct from "../Components/Admin/AddProduct";
import ListProduct from "../Components/Admin/ListProduct";

const Admin = () => {
  return (
    <>
      <div className="admin">
        <Sidebar />
      </div>
      <div>
        <AddProduct />
      </div>
    </>
  );
};

export default Admin;
