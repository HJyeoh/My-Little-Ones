import React, { createContext, useState, useEffect } from "react";
import { use } from "react";
import { data } from "react-router-dom";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAllProduct] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    fetch("http://localhost:8080/demo-1.1/showproduct")
      .then((response) => response.json())
      .then((data) => setAllProduct(data));

    if (localStorage.getItem("auth-token")) {
      const userEmail = localStorage.getItem("userEmail");

      fetch("http://localhost:8080/demo-1.1/getcart", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          user_email: userEmail, // Send the user email
        }).toString(),
      })
        .then((response) => response.json())
        .then((data) => {
          setCartItems(data); // Set the cart data from response
        })
        .catch((error) => {
          console.error("Error fetching cart data:", error);
        });
    }
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    const userEmail = localStorage.getItem("userEmail"); // Get email from localStorage

    fetch("http://localhost:8080/demo-1.1/addtocart", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        product_id: itemId, // Pass the product ID
        user_email: userEmail, // Pass the user email
      }).toString(),
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      // Only remove if quantity is greater than 0
      if (updatedCart[itemId] > 0) {
        updatedCart[itemId] -= 1; // Decrease quantity
      }
      return updatedCart;
    });

    const userEmail = localStorage.getItem("userEmail");

    fetch("http://localhost:8080/demo-1.1/removefromcart", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        product_id: itemId, // Pass the product ID
        user_email: userEmail, // Pass the user email
      }).toString(),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount; // Moved the return statement here
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
