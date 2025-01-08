import { useState, useEffect } from "react";
import CartItems from "../Components/CartItems/CartItems"; // Add this import statement

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
      <CartItems />
    </div>
  );
};

export default Cart;
