import React, { useState } from "react";
import axios from "axios";

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
    <div>
      <h1>User Registration</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="type">Type</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="">Type</option>
          <option value="worker">Worker</option>
          <option value="company">Company</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserRegistration;
