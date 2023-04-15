import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './AddCompany.css'
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
    <form onSubmit={handleSubmit} className="addcompany">
  <div className="addcompany_addcompany">
    <h2 className="addcompany__header">Add Company</h2>
    <div className="addcompany__field">
      <label htmlFor="name" className="addcompany__label">Company Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={companyFormData.name}
        onChange={handleCompanyChange}
        className="addcompany__input"
      />
    </div>
    <div className="addcompany__field">
      <label htmlFor="description" className="addcompany__label">Description:</label>
      <textarea
        id="description"
        name="description"
        value={companyFormData.description}
        onChange={handleCompanyChange}
        className="addcompany__input addcompany__textarea"
      />
    </div>
    <div className="addcompany__field">
      <label htmlFor="website" className="addcompany__label">Website:</label>
      <input
        type="text"
        id="website"
        name="website"
        value={companyFormData.website}
        onChange={handleCompanyChange}
        className="addcompany__input"
      />
    </div>
    <div className="addcompany__field">
      <label htmlFor="location" className="addcompany__label">Location:</label>
      <input
        type="text"
        id="location"
        name="location"
        value={companyFormData.location}
        onChange={handleCompanyChange}
        className="addcompany__input"
      />
    </div>
  </div>

  <div className="addcompany_addjob">
    <h2 className="addcompany__header">Add Job</h2>
    <div className="addcompany__field">
      <label htmlFor="title" className="addcompany__label">Job Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={jobFormData.title}
        onChange={handleJobChange}
        className="addcompany__input"
      />
    </div>
    <div className="addcompany__field">
      <label htmlFor="description" className="addcompany__label">Description:</label>
      <textarea
        id="description"
        name="description"
        value={jobFormData.description}
        onChange={handleJobChange}
        className="addcompany__input addcompany__textarea"
      />
    </div>
    <div className="addcompany__field">
      <label htmlFor="skills" className="addcompany__label">Skills:</label>
      <input
        type="text"
        id="skills"
        name="skills"
        value={jobFormData.skills}
        onChange={handleJobChange}
        className="addcompany__input"
      />
    </div>
  </div>

  <button type="submit" className="addcompany__submit-button">Submit</button>
</form>

  );
};
