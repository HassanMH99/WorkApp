import React, { useState } from "react";
import axios from "axios";

const CVInfo = () => {
  const [educationKeywords, setEducationKeywords] = useState([]);
  const [experienceKeywords, setExperienceKeywords] = useState([]);
  const [workerId, setWorkerId] = useState("");
  const [educationAndExperience, setEducationAndExperience] = useState({});

  const handleWorkerIdChange = (event) => {
    setWorkerId(event.target.value);
  };

  const handleEducationKeywordsChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setEducationKeywords([...educationKeywords, value]);
    } else {
      setEducationKeywords(
        educationKeywords.filter((keyword) => keyword !== value)
      );
    }
  };

  const handleExperienceKeywordsChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setExperienceKeywords([...experienceKeywords, value]);
    } else {
      setExperienceKeywords(
        experienceKeywords.filter((keyword) => keyword !== value)
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5656/worker/cv`, {
        educationKeywords,
        experienceKeywords,
      });
      console.log(workerId);
      setEducationAndExperience(response.data.educationAndExperience);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(educationAndExperience);
  return (
    <div>
        <form onSubmit={handleSubmit}>
        
          <div>
            <p>Education Keywords:</p>
            <label htmlFor="degree">
              <input
                type="checkbox"
                id="degree"
                name="degree"
                value="degree"
                onChange={handleEducationKeywordsChange}
              />
              Degree
            </label>
            <label htmlFor="average">
              <input
                type="checkbox"
                id="average"
                name="average"
                value="average"
                onChange={handleEducationKeywordsChange}
              />
              Average
            </label>
            <label htmlFor="bachelor">
              <input
                type="checkbox"
                id="bachelor"
                name="bachelor"
                value="bachelor"
                onChange={handleEducationKeywordsChange}
              />
              Bachelor
            </label>
            <label htmlFor="master">
              <input
                type="checkbox"
                id="master"
                name="master"
                value="master"
                onChange={handleEducationKeywordsChange}
              />
              Master
            </label>
            <label htmlFor="computerScience">
              <input
                type="checkbox"
                id="computerScience"
                name="computerScience"
                value="computer science"
                onChange={handleEducationKeywordsChange}
              />
              Computer Science
            </label>
            <label htmlFor="engineering">
              <input
                type="checkbox"
                id="engineering"
                name="engineering"
                value="engineering"
                onChange={handleEducationKeywordsChange}
              />
              Engineering
            </label>
            <label htmlFor="fullStack">
              <input
                type="checkbox"
                id="fullStack"
                name="fullStack"
                value="full stack"
                onChange={handleEducationKeywordsChange}
              />
              Full Stack
            </label>
          </div>
          <div>
            <p>Experience Keywords:</p>
            <label htmlFor="experience">
              <input
                type="checkbox"
                id="experience"
                name="experience"
                value="experience"
                onChange={handleExperienceKeywordsChange}
              />
              Experience
            </label>
            <label htmlFor="work">
              <input
                type="checkbox"
                id="work"
                name="work"
                value="work"
                onChange={handleExperienceKeywordsChange}
              />
              Work
            </label>
            <label htmlFor="employment">
              <input
                type="checkbox"
                id="employment"
                name="employment"
                value="employment"
                onChange={handleExperienceKeywordsChange}
              />
              Employment
            </label>
            <label htmlFor="job">
              <input
                type="checkbox"
                id="job"
                name="job"
                value="job"
                onChange={handleExperienceKeywordsChange}
              />
              Job
            </label>
            <label htmlFor="project">
              <input
                type="checkbox"
                id="project"
                name="project"
                value="project"
                onChange={handleExperienceKeywordsChange}
              />
              Project
            </label>
            <label htmlFor="skill">
              <input
                type="checkbox"
                id="skill"
                name="skill"
                value="skill"
                onChange={handleExperienceKeywordsChange}
              />
              Skill
            </label>
          </div>
          <button type="submit">Get CV Info</button>
        </form>
        {educationAndExperience && (
        <div>
          <h2>Education and Experience</h2>
          <p>Education:{educationAndExperience.education}</p>
          <p>Experience:{educationAndExperience.experience}</p>
        </div>
      )}
    </div>
  );
};

export default CVInfo;
