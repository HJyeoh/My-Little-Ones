import React, { useEffect } from "react";
import "./Popular.css";
import data_product from "../Assets/products";
import Item from "../Item/Item";

const Popular = () => {
  const [popularProducts, setPopularProducts] = React.useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/showproduct")
      .then((response) => response.json())
      .then((data) => setPopularProducts(data.slice(0, 4)));
  }, []);

  return (
    <div id="popular-section" className="popular mx-8 lg:mx-28">
      <h1>POPULAR IN BABY</h1>
      <hr />
      <div className="popular-item">
        {popularProducts.map((item, i) => (
          <Item
            key={item.id || i}
            id={item.id}
            name={item.name}
            image={item.photo || item.image}
            price={item.new_price.toFixed(2)}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
