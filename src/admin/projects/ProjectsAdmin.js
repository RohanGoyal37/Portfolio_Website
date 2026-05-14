import { useState, useEffect, useMemo } from "react";
import { getProjects, deleteProject } from "../../data/projectsStore";
import { motion } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiSearch, FiLayers, FiCheckCircle, FiFileText } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const data = await getProjects();
    setProjects(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id);
      fetchProjects();
    }
  };

  const stats = useMemo(() => {
    return {
      total: projects.length,
      published: projects.filter(p => p.status === "published").length,
      drafts: projects.filter(p => p.status !== "published").length
    };
  }, [projects]);

  const filteredProjects = projects.filter(p => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      className="admin-page-wrapper"
    >
      {/* Top Bar with Breadcrumbs and Search */}
      <div className="admin-top-bar">
        <div className="breadcrumbs">
          <span>Admin</span>
          <span className="separator">/</span>
          <span className="current">Projects</span>
        </div>
        <div className="top-bar-actions">
          <div className="search-wrapper">
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="admin-btn-primary" onClick={() => navigate("/admin/projects/new")}>
            <FiPlus /> New Project
          </button>
        </div>
      </div>

      <div className="admin-content-inner">
        {/* Statistics Section */}
        <div className="stats-row">
          <div className="stat-glass-card">
            <div className="stat-icon total"><FiLayers /></div>
            <div className="stat-info">
              <span className="stat-label">Total Projects</span>
              <span className="stat-value">{stats.total}</span>
            </div>
          </div>
          <div className="stat-glass-card">
            <div className="stat-icon published"><FiCheckCircle /></div>
            <div className="stat-info">
              <span className="stat-label">Published</span>
              <span className="stat-value">{stats.published}</span>
            </div>
          </div>
          <div className="stat-glass-card">
            <div className="stat-icon drafts"><FiFileText /></div>
            <div className="stat-info">
              <span className="stat-label">Drafts</span>
              <span className="stat-value">{stats.drafts}</span>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="admin-section-header">
          <h2 className="section-title-main">Project Inventory</h2>
          <p className="section-desc">Manage and organize your portfolio works</p>
        </div>

        {loading ? (
          <div className="admin-loading-state">
            <div className="spinner"></div>
            <p>Fetching your works from the cloud...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="empty-state">
            <FiLayers size={48} />
            <p>No projects found matching your search.</p>
          </div>
        ) : (
          <div className="refined-project-grid">
            {filteredProjects.map((project) => (
              <div key={project.id} className="nexus-project-card">
                <div className="card-media">
                  <img 
                    src={project.image ? (project.image.startsWith('http') ? project.image : process.env.PUBLIC_URL + project.image) : "https://via.placeholder.com/400x225?text=No+Image"} 
                    alt={project.name} 
                  />
                  <div className={`nexus-badge ${project.status}`}>
                    <span className="pip"></span>
                    {project.status}
                  </div>
                </div>
                
                <div className="card-body">
                  <div className="card-main-info">
                    <span className="card-category">{project.category || "General"}</span>
                    <h3 className="card-title">{project.name}</h3>
                  </div>
                  
                  <div className="card-footer-actions">
                    <button className="nexus-action-btn edit" onClick={() => navigate(`/admin/projects/${project.id}`)} title="Edit">
                      <FiEdit2 />
                    </button>
                    <a href={project.demo || project.link} target="_blank" rel="noreferrer" className="nexus-action-btn view" title="Preview">
                      <FiEye />
                    </a>
                    <button className="nexus-action-btn delete" onClick={() => handleDelete(project.id)} title="Delete">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
