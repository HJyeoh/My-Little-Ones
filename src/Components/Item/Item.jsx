import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

const Item = ({ id, name, image, price }) => {
  return (
    <div className="item">
      <Link to={`/product/${id}`}>
        <img onClick={window.scrollTo(0, 0)} src={image} alt={name} />
      </Link>
      <p>{name}</p>
      <div className="item-prices">RM{price}</div>
    </div>
  );
};

export default Item;
