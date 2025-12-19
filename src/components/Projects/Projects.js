import React, { useState, useEffect } from "react";
import { getProjects } from "../../data/projectsStore";
import "./ProjectsSection.css";
import { BsGlobe, BsBoxes } from "react-icons/bs";
import { MdHomeWork } from "react-icons/md";
import { FaCalculator, FaCode } from "react-icons/fa6";
import { GiThink } from "react-icons/gi";
import { SiGoogleanalytics } from "react-icons/si";
import { FaCloudShowersHeavy, FaCar, FaClipboardCheck, FaGamepad, FaWpforms, FaRibbon } from "react-icons/fa";

// Helper function to split the array into chunks of a given size.
const chunkArray = (arr, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
};

const ProjectsSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const rotations = [-21, 7, 25];
  const icons = [
    <BsGlobe />,
    <FaCar />,
    <MdHomeWork />,
    <FaCalculator />,
    <GiThink />,
    <FaCloudShowersHeavy />,
    <SiGoogleanalytics />,
    <FaClipboardCheck />,
    <FaGamepad />,
    <FaWpforms />,
    <FaRibbon />,
    <BsBoxes />,
  ];
  const publishedProjects = getProjects().filter(
    (p) => p.status === "published"
  );

  const projectRows = chunkArray(publishedProjects, 3);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="projects-section">
      {isLoading ? (
        <div className="loading-container">
          <div className="bouncing-ball" />
        </div>
      ) : (
        <>
          <h2 className="projects-heading">Projects</h2>
          {projectRows.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((project, index) => {
                const rotationValue = rotations[index] ?? 0;
                const icon = icons[rowIndex * 3 + index] ?? <GiThink />;
                const delay = (rowIndex * 3 + index) * 0.1; // Staggered delay

                return (
                  <div
                    key={project.name + index}
                    className="glass"
                    data-text={project.name}
                    style={{
                      "--r": rotationValue,
                      "--delay": `${delay}s`,
                    }}
                  >
                    <div className="card-content">
                      <h3 className="project-icon">{icon}</h3>
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="code-icon-link"
                    >
                      <FaCode className="code-icon" />
                    </a>
                  </div>
                );
              })}
            </div>
          ))}
        </>
      )}
    </section>
  );
};

export default ProjectsSection;