import axios from "axios";
import React, { useEffect, useState } from "react";
import "./WorkerPage.css";
import { useParams } from "react-router-dom";
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
    console.log(worker);
  }, [id]);

  if (!worker) {
    return <div>Loading...</div>;
  }
  function HandleMatch() {
    window.location.href = "/match";
  }
  function HandleLogout() {
    window.location.href = "/";
  }
  return (
    <div className="worker-profile-container">
      <div className="worker-profile">
        <div className="nav-worker">
          <button
            className="nav-worker__button nav-worker__button--match"
            onClick={HandleMatch}
          >
            Match
          </button>
          <h2 className="worker-profile__name">{worker.name}</h2>
          <button
            className="nav-worker__button nav-worker__button--logout"
            onClick={HandleLogout}
          >
            Logout
          </button>
        </div>
        <p className="worker-profile__user">User: {worker.userId.email}</p>
        <p className="worker-profile__bio">Bio: {worker.bio}</p>
        <p className="worker-profile__skills">
          Skills: {worker.skills.join(", ")}
        </p>
        <iframe
          className="worker-profile__cv"
          src={worker.cv}
          title="Worker CV"
        ></iframe>
      </div>
    </div>
  );
}
