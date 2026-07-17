
import React, { useState } from "react";
import { motion } from "framer-motion";
// Custom Masonry layout for true column control
import { getProjects } from "../../data/projectsStore";
import { FaCode, FaExternalLinkAlt } from "react-icons/fa";
import "./ProjectsSection.css";



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
  const result = arr.map((p, idx) => ({ ...p, size: p.size || 'square' }));
  // Pick random indices for 'tall'
  const indices = shuffleArray([...Array(arr.length).keys()]).slice(0, Math.min(tallCount, arr.length));
  indices.forEach(i => {
    result[i].size = 'tall';
  });
  // Shuffle again to mix tall and square
  return shuffleArray(result);
}

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  React.useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjects();
      // Filter for published projects
      const published = data.filter(p => p.status === "published");
      setProjects(published.length > 0 ? published : []);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  // Dynamically generate unique categories from projects
  const categories = React.useMemo(() => {
    const cats = projects
      .map(p => p.category && p.category.trim())
      .filter(Boolean);
    // Remove duplicates and sort alphabetically
    const unique = Array.from(new Set(cats)).sort((a, b) => a.localeCompare(b));
    return ["All", ...unique];
  }, [projects]);

  // Filter, assign 'tall', and shuffle again
  const filteredProjects = React.useMemo(() => {
    const filtered = activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);
    
    return assignRandomTallAndShuffle(filtered, 3);
  }, [projects, activeFilter]);



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

  if (loading) {
    return (
      <section className="projects-section">
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <p className="shimmer-text">Loading My Works...</p>
        </div>
      </section>
    );
  }

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
                key={project.id || project.name}
                className="project-card"
                style={{
                  animationDelay: `${(colIdx * col.length + idx) * 0.08}s`
                }}
              >
                <div className="project-img-wrapper">
                  {project.privateRepo && (
                    <div className="private-repo-ribbon">Private Repo</div>
                  )}
                  <img
                    src={project.image ? (project.image.startsWith('http') ? project.image : process.env.PUBLIC_URL + project.image) : process.env.PUBLIC_URL + "/projects/default.png"}
                    alt={project.name}
                    className="project-img"
                  />
                  <div className="project-overlay">
                    <div className="overlay-content">
                      <h3 className="project-title">{project.name}</h3>
                      <p className="project-tagline">{project.description}</p>
                      <div className="project-tech">
                        {(project.technologies || []).map((tech, i) => (
                          <span key={i} className="tech-badge">{tech}</span>
                        ))}
                      </div>
                      <div className="project-btns">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-btn"
                          >
                            <FaCode /> Code
                          </a>
                        )}
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
