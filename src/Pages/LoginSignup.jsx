import React from "react";
import { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setstate] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const response = await fetch("http://localhost:8080/demo-1.1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `email=${formData.email}&password=${formData.password}`,
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("auth-token", result.token); // Save JWT token
        if (formData.email === "admin@gmail.com") {
          localStorage.setItem("userType", "admin");
        } else {
          localStorage.setItem("userType", "user");
          localStorage.setItem("userEmail", formData.email);
        }
        window.location.replace("/"); // Redirect after successful login
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert(error);
    }
  };

  const signup = async () => {
    const response = await fetch("http://localhost:8080/demo-1.1/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `name=${formData.username}&email=${formData.email}&password=${formData.password}`,
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message); // Handle success message
      localStorage.setItem("auth-token", result.token); // Save JWT token
      window.location.replace("/"); // Redirect to home page
    } else {
      alert(result.error); // Handle error message
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
            />
          ) : (
            <></>
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span
              onClick={() => {
                setstate("Login");
              }}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span
              onClick={() => {
                setstate("Sign Up");
              }}
            >
              Click here
            </span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to use the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
