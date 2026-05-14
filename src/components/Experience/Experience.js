import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./Experience.css";
import { getExperience } from "../../data/experienceStore";

const Experience = () => {
  const [experienceData, setExperienceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchExperience = async () => {
      const data = await getExperience();
      const published = data.filter((e) => e.status === "published");
      
      // Helper to parse duration and get a sortable date
      const getSortDate = (duration) => {
        if (!duration) return 0;
        const yearMatch = duration.match(/\d{4}/);
        if (!yearMatch) return 0;
        const year = parseInt(yearMatch[0]);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let monthIndex = months.findIndex(m => duration.toLowerCase().includes(m.toLowerCase()));
        return new Date(year, monthIndex === -1 ? 0 : monthIndex).getTime();
      };

      // Sort by date descending (latest first)
      const sorted = published.sort((a, b) => getSortDate(b.duration) - getSortDate(a.duration));
      
      setExperienceData(sorted);
      setLoading(false);
    };
    fetchExperience();
  }, []);

  useEffect(() => {
    if (selectedExperience) {
      setTimeout(() => setShowModal(true), 50);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      setShowModal(false);
      document.body.style.overflow = "unset";
    }
  }, [selectedExperience]);

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "unset";
    setTimeout(() => setSelectedExperience(null), 400);
  };

  if (loading) {
    return (
      <section className="experience-section">
        <p style={{ textAlign: 'center', color: 'var(--admin-text-dim)' }}>Loading Experience...</p>
      </section>
    );
  }

  return (
    <section className="experience-section">
      <h2 className="experience-title">Experience</h2>
      <div className="experience-timeline">
        {experienceData.map((exp, index) => (
          <div key={index} className="experience-card">
            <div className="experience-card-inner">
              <div className="experience-card-front">
                <h3 className="company-name">{exp.company}</h3>
                <h4 className="position-name">{exp.role || exp.position}</h4>
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

      {/* Modal for Detailed View using React Portal */}
      {selectedExperience && createPortal(
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

            <h3>{selectedExperience.role || selectedExperience.position}</h3>

            {/* Display description as bullet points */}
            <ul className="experience-points">
              {Array.isArray(selectedExperience.description) ? 
                selectedExperience.description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                )) : 
                <li>{selectedExperience.description}</li>
              }
            </ul>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default Experience;
