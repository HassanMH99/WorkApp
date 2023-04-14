import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
    <div>
      <h2>{company.name}</h2>
      <p>{company.description}</p>
      <p>Website: <a href={company.website}>{company.website}</a></p>
      <p>Location: {company.location}</p>

      <h3>Jobs</h3>
      <ul>
        {company.jobs.map(job => (
          <li key={job._id}>
            <h4>{job.title}</h4>
            <p>{job.description}</p>
            <p>Skills: {job.skills.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
