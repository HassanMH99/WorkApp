import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function WorkerPage() {
    const { id } = useParams();
    const [worker, setWorker] = useState(null);
  
    useEffect(() => {
        const fetchWorker = async () => {
          try {
            const response = await axios.get(`http://localhost:5656/worker/${id}`);
            const data = response.data;
            setWorker(data.worker);
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchWorker();
      }, [id]);
  
    if (!worker) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h2>{worker.name}</h2>
        <p>Bio: {worker.bio}</p>
        <p>Skills: {worker.skills.join(', ')}</p>
        <p href={worker.cv} target="_blank" rel="noreferrer">CV</p>
        <p>User: {worker.userId.email}</p>
        
      </div>
    );
}
