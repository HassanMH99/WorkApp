import React, { useState } from "react";
import axios from "axios";
import './Register.css'
const UserRegistration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5656/users/register",
        {
          email,
          password,
          type,
        }
      );
      console.log(response.data);
      // Redirect to the user profile page
      alert("Register Succesfull Continue process")
      if(type==="worker"){
        window.location.href=`/addworker/${response.data._id}`
    }else if(type==="company"){
        window.location.href=`/addcompany/${response.data._id}`
    }

    } catch (error) {
        if (error.response && error.response.status === 409) {
            alert("This email is already registered")
            
          } else {
            setErrorMessage("Failed to register.");
          }
    }
   
  };

  return (
    <div class="form-container">
    <h1 class="form-title">User Registration</h1>
    <div class="form-wrapper">
      {errorMessage && <p class="error-message">{errorMessage}</p>}
      <form class="form" onSubmit={handleSubmit}>
        <div class="form-group">
          <label class="form-label" htmlFor="email">Email:</label>
          <input
            class="form-input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div class="form-group">
          <label class="form-label" htmlFor="password">Password:</label>
          <input
            class="form-input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div class="form-group">
          <label class="form-label" htmlFor="type">Type:</label>
          <select
            class="form-input"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Type</option>
            <option value="worker">Worker</option>
            <option value="company">Company</option>
          </select>
        </div>
        <div class="form-group">
          <button class="form-button" type="submit">Register</button>
        </div>
      </form>
    </div>
  </div>
  
  
  
  
  
  );
};

export default UserRegistration;
