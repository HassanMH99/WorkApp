import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const response = await axios.get('http://localhost:5656/users/checkAuth');
//         if (response.status === 200) {
//           const user = await axios.get(`http://localhost:5656/users/getUser/${response.data.email}`);
//           if (user.data.type === 'worker') {
//             window.location.href = "/worker";
//         } else if (user.data.type === 'company') {
//             window.location.href = "/company";
//         }
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     checkAuth();
//   }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5656/users/login', {
        email,
        password,
      });
      const getuser = await axios.get(`http://localhost:5656/users/getUser/${email}`)
      console.log(getuser.data._id);
      
      if (getuser.data.type === 'worker') {
        window.location.href = `/worker/${getuser.data._id}`;
      } else if (getuser.data.type === 'company') {
        window.location.href = `/company/${getuser.data._id}`;
      } else {
        setErrorMessage('Invalid user type');
      }
  
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.message);
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {errorMessage && <div>{errorMessage}</div>}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <Link to={"/register"}>Signup</Link>
      </form>
    </div>
  );
};


