import { useState, useEffect } from "react";

const Cart = () => {
  // Step 1: Initialize state for products
  const [products, setProducts] = useState([]);

  // Step 2: Fetch products from the backend when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products from the server
        const response = await fetch(
          "http://localhost:8080/demo-1.1/showproduct"
        );

        // If response is ok, convert it to JSON and store in state
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Error fetching products:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    // Call the fetch function when the component mounts
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>All Products</h1>
      <div>
        {products.length > 0 ? (
          // Map through the products and display them
          products.map((product) => (
            <div key={product.id}>
              <h2>{product.name}</h2>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100px" }}
              />
              <p>Category: {product.category}</p>
              <p>Price: ${product.new_price}</p>
              <p>Old Price: ${product.old_price}</p>
              <p>Available: {product.available ? "Yes" : "No"}</p>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
