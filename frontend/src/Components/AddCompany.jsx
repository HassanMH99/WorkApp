import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function AddCompany(){
  const { userId } = useParams();
  const [errorMessage, setErrorMessage] = useState('');
  const [companyFormData, setCompanyFormData] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
  });

  const [jobFormData, setJobFormData] = useState({
    title: '',
    description: '',
    skills: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:5656/company/addCompany/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...companyFormData,
          jobs: [jobFormData],
        }),
      });

      const data = await response.json();
      console.log(data);
        
      // clear form data
      setCompanyFormData({
        name: '',
        description: '',
        website: '',
        location: '',
      });

      setJobFormData({
        title: '',
        description: '',
        skills: '',
      });
      window.location.href = `/company/${userId}`
    }  catch (err) {
      if (err.message === 'User already has a company') {
        setErrorMessage('You already have a company.');
        alert('You already have a company.');
      } else {
        setErrorMessage('An error occurred.');
      }
    }
  };

  const handleCompanyChange = (event) => {
    setCompanyFormData({
      ...companyFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleJobChange = (event) => {
    setJobFormData({
      ...jobFormData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Company</h2>
      <label htmlFor="name">Company Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={companyFormData.name}
        onChange={handleCompanyChange}
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        value={companyFormData.description}
        onChange={handleCompanyChange}
      />

      <label htmlFor="website">Website:</label>
      <input
        type="text"
        id="website"
        name="website"
        value={companyFormData.website}
        onChange={handleCompanyChange}
      />

      <label htmlFor="location">Location:</label>
      <input
        type="text"
        id="location"
        name="location"
        value={companyFormData.location}
        onChange={handleCompanyChange}
      />

      <h2>Add Job</h2>
      <label htmlFor="title">Job Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={jobFormData.title}
        onChange={handleJobChange}
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        value={jobFormData.description}
        onChange={handleJobChange}
      />

      <label htmlFor="skills">Skills:</label>
      <input
        type="text"
        id="skills"
        name="skills"
        value={jobFormData.skills}
        onChange={handleJobChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
};
