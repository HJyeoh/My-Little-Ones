import React, { useState, useEffect } from "react";
import "./ListProduct.css";

const ListProduct = () => {
  // State to store products
  const [products, setProducts] = useState([]);

  // Function to fetch products from the backend
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/demo-1.1/showproduct"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle product deletion
  const handleRemoveProduct = async (id) => {
    if (!id) {
      alert("Product ID is missing");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/demo-1.1/removeproduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ id }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        // Remove the product from the state after successful deletion
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
        alert(`Product "${result.name}" removed successfully!`);
      } else {
        alert(`Error: ${result.error || "Failed to remove product"}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="list-product">
      <h2>Product List</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <div className="product-item" key={product.id}>
              <img
                src={`http://localhost:8080/demo-1.1/${product.image}`}
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>Product id: {product.id}</p>
              <p>Category: {product.category}</p>
              <p>Old Price: ${product.old_price}</p>
              <p>New Price: ${product.new_price}</p>
              <button
                onClick={() => handleRemoveProduct(product.id)}
                className="delete-btn"
              >
                Remove Product
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListProduct;
