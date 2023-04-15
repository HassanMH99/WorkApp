import React from "react";
import "./HomePage.css";
export default function HomePage() {
  function login() {
    window.location.href = "/login";
  }
  function register() {
    window.location.href = "/register";
  }
  return (
    <div className="coverpage">
      <div className="Homepage-navbar">
        <h1 className="header">WorkApp</h1>
          <button className="primary-button" id="signin" onClick={login}>
            Sign In
          </button>
      </div>
        <button className="primary-button" id="signup" onClick={register}>
          Sign Up
        </button>
    
    </div>
  );
}
