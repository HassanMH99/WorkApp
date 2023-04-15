import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './AddWorker.css'
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
    <div className="addWorker-container">
      <form onSubmit={handleSubmit} className="addWorker-form">
      {errorMessage && <div className="addWorker-error">{errorMessage}</div>}
      <h1 className="addWorker-title">Add More Details</h1>
      <div className="addWorker-input">
        <label htmlFor="name" className="addWorker-label">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={worker.name}
          onChange={handleChange}
          className="addWorker-text"
        />
      </div>
      <div className="addWorker-input">
        <label htmlFor="bio" className="addWorker-label">Bio:</label>
        <textarea
          id="bio"
          name="bio"
          value={worker.bio}
          onChange={handleChange}
          className="addWorker-textarea"
        />
      </div>
      <div className="addWorker-input">
        <label htmlFor="skills" className="addWorker-label">Skills:</label>
        <input
          type="text"
          id="skills"
          name="skills"
          value={worker.skills}
          onChange={handleChange}
          className="addWorker-text"
        />
      </div>
      <div className="addWorker-input">
        <label htmlFor="cv" className="addWorker-label">CV:</label>
        <input
          type="file"
          id="cv"
          name="cv"
          onChange={handleChange}
          className="addWorker-file"
        />
      </div>
      <button type="submit" className="addWorker-button">Create Worker</button>
        </form>
    </div>
  
  );
};
