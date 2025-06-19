import React, { useState, useEffect } from "react";
import "./Experience.css";

const Experience = () => {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const experienceData = [
    {
      company: "Perficient Placements",
      position: "Python Developer ",
      duration: "Jul 2024 - Present",
      description: [
        "Build and maintain scalable data pipelines using Python, SQL, and Apache Spark to process 5M+ records weekly, increasing data availability and reducing report latency by 30%.",
        "Integrate ML models into Python workflows for churn prediction and sales forecasting, boosting automation efficiency by 25%.",
        "Optimize 100+ SQL queries and Spark jobs, reducing data processing time by 40% and enabling analysts to generate insights 2x faster.",
      ],
    },
    {
      company: "Nefroverse",
      position: "Python Developer",
      duration: "Apr 2023 - Jul 2024",
      description: [
        "Developed Python scripts to automate data processing and feed real-time metrics into dashboards, improving data visibility by 35%.",
        "Built and maintained ETL workflows with Python and SQL, reducing manual data handling by 50% and improving accuracy across reporting systems.",
        "Collaborated with analysts to integrate backend data pipelines with BI tools, reducing reporting delays by 40% and accelerating decision-making cycles.",
      ],
    },
    {
      company: "Elite Techno Groups",
      position: "Python AI/ML Intern",
      duration: "Aug 2021 - Sept 2021",
      description: [
        "Developed a Python-based Inventory Management System using JSON for data handling, reinforcing core programming skills and backend logic design.",
        "Performed exploratory data analysis on Olympic dataset using Pandas and NumPy to identify patterns and trends across sports and nations.",
        "Built a Breast Cancer Detection model using supervised learning algorithms and basic deep learning techniques, gaining hands-on exposure to ML model training, evaluation, and prediction workflows.",
      ],
    },
  ];

  useEffect(() => {
    if (selectedExperience) {
      setTimeout(() => setShowModal(true), 50);
    } else {
      setShowModal(false);
    }
  }, [selectedExperience]);

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedExperience(null), 400);
  };

  return (
    <section className="experience-section">
      <h2 className="experience-title">Experience</h2>
      <div className="experience-timeline">
        {experienceData.map((exp, index) => (
          <div key={index} className="experience-card">
            <div className="experience-card-inner">
              <div className="experience-card-front">
                <h3 className="company-name">{exp.company}</h3>
                <h4 className="position-name">{exp.position}</h4>
                <p className="experience-description">{exp.duration}</p>
              </div>
              <div className="experience-card-back">
                <button
                  className="view-more-button"
                  onClick={() => setSelectedExperience(exp)}
                >
                  View More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Detailed View */}
      {selectedExperience && (
        <div
          className={`experience-modal ${showModal ? "active" : ""}`}
          onClick={closeModal}
        >
          <div
            className="experience-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-modal" onClick={closeModal}>
              ×
            </button>

            <div className="header">
              <h2>{selectedExperience.company}</h2>
              <div className="duration">{selectedExperience.duration}</div>
            </div>

            <h3>{selectedExperience.position}</h3>

            {/* Display description as bullet points */}
            <ul className="experience-points">
              {selectedExperience.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default Experience;
