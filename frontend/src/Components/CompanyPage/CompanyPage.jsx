import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CompanyPage.css'
export default function CompanyPage({ companyId }) {
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`http://localhost:5656/company/${id}`);
        setCompany(response.data.company);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompany();
  }, [companyId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!company) {
    return <p>Company not found</p>;
  }

  return (
    <div class="company">
    <h2 class="company__name">{company.name}</h2>
    <p class="company__description">{company.description}</p>
    <p class="company__website">Website: <a href={company.website}>{company.website}</a></p>
    <p class="company__location">Location: {company.location}</p>
  
    <h3 class="company__jobs-heading">Jobs</h3>
    <ul class="company__jobs-list">
      {company.jobs.map(job => (
        <li key={job._id} class="company__job">
          <h4 class="company__job-title">{job.title}</h4>
          <p class="company__job-description">{job.description}</p>
          <p class="company__job-skills">Skills: {job.skills.join(', ')}</p>
        </li>
      ))}
    </ul>
  </div>
  
  );
}
