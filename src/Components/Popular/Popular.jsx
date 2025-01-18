import React, { useEffect } from "react";
import "./Popular.css";
import data_product from "../Assets/products";
import Item from "../Item/Item";

const Popular = () => {
  const [popularProducts, setPopularProducts] = React.useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/demo-1.1/popular")
      .then((response) => response.json())
      .then((data) => setPopularProducts(data));
  }, []);

  return (
    <div id="popular-section" className="popular">
      <h1>POPULAR IN BABY</h1>
      <hr />
      <div className="popular-item">
        {popularProducts.map((item, i) => (
          <Item
            key={item.id || i}
            id={item.id}
            name={item.name}
            image={item.photo}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
