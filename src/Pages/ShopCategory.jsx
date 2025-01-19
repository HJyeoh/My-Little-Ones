import React, { useContext } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  console.log("All Products:", all_product);

  // Filter products by category
  const filteredProducts = all_product.filter(
    (item) => item.category === props.category
  );

  return (
    <div className="shop-category mb-12">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing {filteredProducts.length}</span> out of{" "}
          {all_product.length} products
        </p>
      </div>
      <div className="shopcategory-products lg:mx-32 md:mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item, i) => (
            <Item
              key={item.id || i}
              id={item.id}
              name={item.name}
              image={`http://localhost:8080/demo-1.1/${
                item.photo || item.image
              }`}
              price={item.new_price.toFixed(2)}
            />
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default ShopCategory;
