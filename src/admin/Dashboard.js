import { useState, useEffect } from "react";
import { getProjects } from "../data/projectsStore";
import { getExperience } from "../data/experienceStore";
import { migrateProjects } from "./utils/migrateData";
import { motion } from "framer-motion";
import { FiPlus, FiDatabase, FiBriefcase, FiFolder, FiTrendingUp, FiActivity, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [stats, setStats] = useState({ projects: 0, experience: 0 });
  const [migrating, setMigrating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      const p = await getProjects();
      const e = await getExperience();
      setStats({ projects: p.length, experience: e.length });
    };
    fetchStats();
  }, []);

  const handleMigrate = async () => {
    if (window.confirm("This will upload your projects.json data to Firebase. Continue?")) {
      setMigrating(true);
      const result = await migrateProjects();
      setMigrating(false);
      if (result.success) {
        alert(`Successfully migrated ${result.count} projects!`);
        window.location.reload();
      } else {
        alert(result.message);
      }
    }
  };

  return (
    <motion.div 
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      className="dashboard-wrapper"
    >
      {/* Welcome Header */}
      <div className="dashboard-welcome">
        <div className="welcome-text">
          <h1>Welcome back, <span className="highlight">Rohan</span></h1>
          <p>Your portfolio is currently connected to Firebase Cloud and live to the world.</p>
        </div>
        <div className="live-status">
          <span className="pulse-dot"></span>
          <span>System Online</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-row">
        <div className="stat-glass-card">
          <div className="stat-icon projects"><FiFolder /></div>
          <div className="stat-info">
            <span className="stat-label">Total Projects</span>
            <span className="stat-value">{stats.projects}</span>
          </div>
          <div className="stat-trend positive">
            <FiTrendingUp /> 12%
          </div>
        </div>
        <div className="stat-glass-card">
          <div className="stat-icon experience"><FiBriefcase /></div>
          <div className="stat-info">
            <span className="stat-label">Experience items</span>
            <span className="stat-value">{stats.experience}</span>
          </div>
          <div className="stat-trend">
            <FiActivity /> Active
          </div>
        </div>
        <div className="stat-glass-card">
          <div className="stat-icon storage"><FiDatabase /></div>
          <div className="stat-info">
            <span className="stat-label">Storage mode</span>
            <span className="stat-value">Cloud</span>
          </div>
          <div className="stat-trend positive">
            <FiCheckCircle /> Secure
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="admin-section-header">
        <h2 className="section-title-main">Quick Operations</h2>
        <p className="section-desc">Common tasks to manage your portfolio</p>
      </div>

      <div className="quick-actions-grid">
        <div className="action-card" onClick={() => navigate("/admin/projects/new")}>
          <div className="action-icon"><FiPlus /></div>
          <div className="action-content">
            <h3>New Project</h3>
            <p>Add a new showcase item to your portfolio.</p>
          </div>
          <FiArrowRight className="action-arrow" />
        </div>

        <div className="action-card" onClick={() => navigate("/admin/experience")}>
          <div className="action-icon"><FiBriefcase /></div>
          <div className="action-content">
            <h3>Update Experience</h3>
            <p>Edit your career timeline and skills.</p>
          </div>
          <FiArrowRight className="action-arrow" />
        </div>

        <div className="action-card migration" onClick={handleMigrate}>
          <div className="action-icon"><FiDatabase /></div>
          <div className="action-content">
            <h3>Sync Data</h3>
            <p>Migrate local JSON files to Firestore cloud.</p>
          </div>
          {migrating ? <div className="spinner-small"></div> : <FiArrowRight className="action-arrow" />}
        </div>
      </div>
    </motion.div>
  );
}

// Helper components for icons used in stats
function FiCheckCircle() {
  return (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}
