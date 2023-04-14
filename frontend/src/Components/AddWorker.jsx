import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
export default function AddWorker() {
  const { userId } = useParams();
  const [worker, setWorker] = useState({
    name: '',
    bio: '',
    skills: '',
    cv: null,
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to store the form data
    const formData = new FormData();
    formData.append('name', worker.name);
    formData.append('bio', worker.bio);
    formData.append('skills', worker.skills);
    formData.append('cv', worker.cv);

    try {
      // Send a POST request to the server to create a new worker
      const response = await axios.post(`http://localhost:5656/worker/addworker/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Reset the form and show a success message
      setWorker({
        name: '',
        bio: '',
        skills: '',
        cv: null,
      });
      setErrorMessage('');
      
      alert(response.data.message);
      window.location.href = `/worker/${userId}`
    } catch (error) {
      // Show an error message if the request fails
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Network error');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setWorker((prevWorker) => ({
      ...prevWorker,
      [name]: files ? files[0] : value,
    }));
  };
  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <div className="error">{errorMessage}</div>}
  
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={worker.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="bio">Bio:</label>
        <textarea id="bio" name="bio" value={worker.bio} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="skills">Skills:</label>
        <input
          type="text"
          id="skills"
          name="skills"
          value={worker.skills}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="cv">CV:</label>
        <input type="file" id="cv" name="cv" onChange={handleChange} />
      </div>
      <button type="submit">Create Worker</button>
    </form>
  );
};
