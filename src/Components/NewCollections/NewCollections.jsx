import React, { useEffect } from "react";
import "./NewCollections.css";
import Item from "../Item/Item";
import { useState } from "react";

const NewCollections = () => {
  const [new_collections, setNewCollections] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/demo-1.1/newcollection")
      .then((response) => response.json())
      .then((data) => setNewCollections(data));
  }, []);
  return (
    <div className="new-collections mx-8 lg:mx-32">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collections.map((item, i) => (
          <Item
            key={item.id || i}
            id={item.id}
            name={item.name}
            image={`http://localhost:8080/demo-1.1/${item.photo || item.image}`}
            price={item.new_price.toFixed(2)}
          />
        ))}
      </div>
    </div>
  );
};

export default NewCollections;
