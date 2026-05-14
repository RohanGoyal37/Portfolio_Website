import { useState, useEffect } from "react";
import { getExperience, deleteExperienceItem } from "../../data/experienceStore";
import { motion } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2, FiBriefcase } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ExperienceAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    setLoading(true);
    const data = await getExperience();
    
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
    const sorted = data.sort((a, b) => getSortDate(b.duration) - getSortDate(a.duration));
    
    setItems(sorted);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this experience item?")) {
      await deleteExperienceItem(id);
      fetchExperience();
    }
  };

  return (
    <motion.div 
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      className="admin-page-wrapper"
    >
      <div className="admin-top-bar">
        <div className="breadcrumbs">
          <span>Admin</span>
          <span className="separator">/</span>
          <span className="current">Experience</span>
        </div>
        <div className="top-bar-actions">
          <button className="admin-btn-primary" onClick={() => navigate("/admin/experience/new")}>
            <FiPlus /> Add Experience
          </button>
        </div>
      </div>

      <div className="admin-section-header">
        <h2 className="section-title-main">Career Timeline</h2>
        <p className="section-desc">Manage your professional experience and history.</p>
      </div>

      {loading ? (
        <div className="admin-loading-state">
          <div className="spinner"></div>
          <p>Loading timeline...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="editor-glass-section" style={{textAlign: 'center', padding: '4rem 2rem'}}>
          <div className="stat-icon experience" style={{margin: '0 auto 1.5rem', width: '80px', height: '80px', fontSize: '2.5rem'}}>
            <FiBriefcase />
          </div>
          <h3>No Experience Added</h3>
          <p style={{color: 'var(--admin-text-dim)', marginBottom: '2rem'}}>Your career timeline is currently empty. Add your first role to start building it.</p>
          <button className="admin-btn-primary" onClick={() => navigate("/admin/experience/new")} style={{margin: '0 auto'}}>
            <FiPlus /> Add First Role
          </button>
        </div>
      ) : (
        <div className="refined-project-grid">
          {items.map((item) => (
            <div key={item.id} className="nexus-project-card" style={{display: 'flex', flexDirection: 'column'}}>
              <div className="card-body" style={{flex: 1}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem'}}>
                  <div className="stat-icon experience" style={{width: '40px', height: '40px', fontSize: '1.2rem'}}>
                    <FiBriefcase />
                  </div>
                  <div className="nexus-badge" style={{position: 'static', background: item.status === 'published' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(255, 255, 255, 0.05)', color: item.status === 'published' ? '#4ade80' : 'var(--admin-text-dim)'}}>
                    {item.status === 'published' ? 'Live' : 'Draft'}
                  </div>
                </div>
                
                <h3 style={{margin: '0 0 0.5rem 0', fontSize: '1.2rem', color: '#fff'}}>{item.company}</h3>
                <h4 style={{margin: '0 0 1rem 0', fontSize: '0.9rem', color: 'var(--admin-accent)', fontWeight: '500'}}>{item.role || item.position}</h4>
                <p style={{margin: 0, fontSize: '0.85rem', color: 'var(--admin-text-dim)'}}>{item.duration}</p>
              </div>
              
              <div className="card-footer-actions">
                <button 
                  className="nexus-action-btn" 
                  onClick={() => navigate(`/admin/experience/${item.id}`)}
                  title="Edit"
                >
                  <FiEdit2 />
                </button>
                <button 
                  className="nexus-action-btn" 
                  onClick={() => handleDelete(item.id)}
                  title="Delete"
                  style={{color: '#ff5555'}}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
