
import React, { useState } from "react";
import { motion } from "framer-motion";
// Custom Masonry layout for true column control
import projects from "./projects.json";
import { FaCode, FaExternalLinkAlt } from "react-icons/fa";
import "./ProjectsSection.css";


const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  // Dynamically generate unique categories from projects.json
  const categories = React.useMemo(() => {
    const cats = projects
      .map(p => p.category && p.category.trim())
      .filter(Boolean);
    // Remove duplicates and sort alphabetically
    const unique = Array.from(new Set(cats)).sort((a, b) => a.localeCompare(b));
    return ["All", ...unique];
  }, []);


  // Shuffle array utility
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }


  // Randomly assign 'tall' to a subset of projects for each render, then shuffle again
  function assignRandomTallAndShuffle(projectsArr, tallCount = 3) {
    const arr = shuffleArray(projectsArr);
    const result = arr.map((p, idx) => ({ ...p, size: 'square' }));
    // Pick random indices for 'tall'
    const indices = shuffleArray([...Array(arr.length).keys()]).slice(0, Math.min(tallCount, arr.length));
    indices.forEach(i => {
      result[i].size = 'tall';
    });
    // Shuffle again to mix tall and square
    return shuffleArray(result);
  }

  // Filter, assign 'tall', and shuffle again
  const filteredProjects = assignRandomTallAndShuffle(
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter),
    3 // Number of tall cards per render (adjust as needed)
  );


  // Responsive column count
  function getColumnCount() {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 700) return 1;
    if (window.innerWidth < 1100) return 2;
    return 3;
  }

  const [columns, setColumns] = React.useState(getColumnCount());
  React.useEffect(() => {
    function handleResize() {
      setColumns(getColumnCount());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Distribute cards into columns for a mixed look
  function distributeToColumns(cards, colCount) {
    const cols = Array.from({ length: colCount }, () => []);
    cards.forEach((card, idx) => {
      cols[idx % colCount].push(card);
    });
    return cols;
  }

  const columnsArray = distributeToColumns(filteredProjects, columns);

  return (
    <section className="projects-section">
      <div className="section-intro">
        <motion.h2
          className="projects-heading"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 1, 0.5, 1],
          }}
        >
          <span className="bulb-glow" role="img" aria-label="bulb">💡</span>
          <span className="shimmer-text"> My Creative Works</span>
        </motion.h2>
        <p className="projects-subheading">
          A collection of projects where I experimented, built, and learned.
        </p>
      </div>
      <div className="projects-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn${activeFilter === cat ? " active" : ""}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="masonry-grid">
        {columnsArray.map((col, colIdx) => (
          <div className="masonry-grid_column" key={colIdx}>
            {col.map((project, idx) => (
              <div
                key={project.name}
                className="project-card"
                style={{
                  animationDelay: `${(colIdx * col.length + idx) * 0.08}s`
                }}
              >
                <div className="project-img-wrapper">
                  <img
                    src={project.image ?? process.env.PUBLIC_URL + "/projects/default.png"}
                    alt={project.name}
                    className="project-img"
                  />
                  <div className="project-overlay">
                    <div className="overlay-content">
                      <h3 className="project-title">{project.name}</h3>
                      <p className="project-tagline">{project.description}</p>
                      <div className="project-tech">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="tech-badge">{tech}</span>
                        ))}
                      </div>
                      <div className="project-btns">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-btn"
                        >
                          <FaCode /> Code
                        </a>
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-btn"
                          >
                            <FaExternalLinkAlt /> Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;