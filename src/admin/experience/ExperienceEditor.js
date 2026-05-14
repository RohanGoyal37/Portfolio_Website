import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getExperience, saveExperienceItem } from "../../data/experienceStore";
import { motion } from "framer-motion";
import { FiSave, FiArrowLeft, FiBriefcase, FiAlignLeft, FiCalendar, FiChevronDown } from "react-icons/fi";

export default function ExperienceEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(id !== "new");
  
  const [form, setForm] = useState({
    company: "",
    role: "",
    duration: "",
    description: "",
    status: "published"
  });

  useEffect(() => {
    const fetchItem = async () => {
      const items = await getExperience();
      const item = items.find(i => i.id === id);
      if (item) {
        setForm({
          ...item,
          description: Array.isArray(item.description) 
            ? item.description.join("\n") 
            : item.description || ""
        });
      }
      setLoading(false);
    };

    if (id !== "new") {
      fetchItem();
    }
  }, [id]);


  const updateField = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const dataToSave = {
      ...form,
      description: typeof form.description === "string" 
        ? form.description.split("\n").filter(line => line.trim() !== "")
        : form.description
    };
    
    if (id !== "new") dataToSave.id = id;

    await saveExperienceItem(dataToSave);
    navigate("/admin/experience");
  };

  if (loading) return (
    <div className="admin-loading-state">
      <div className="spinner"></div>
      <p>Loading editor...</p>
    </div>
  );

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
          <span>Experience</span>
          <span className="separator">/</span>
          <span className="current">{id === "new" ? "New" : "Edit"}</span>
        </div>
        <div className="top-bar-actions">
          <button className="nexus-action-btn" onClick={() => navigate(-1)}>
            <FiArrowLeft />
          </button>
        </div>
      </div>

      <div className="editor-layout-grid" style={{ gridTemplateColumns: '1fr' }}>
        <div className="editor-main-column" style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          <form onSubmit={handleSave}>
            
            {/* Fundamentals Section */}
            <div className="editor-glass-section">
              <div className="section-header-compact">
                <FiBriefcase className="section-icon" />
                <h3>Role Details</h3>
              </div>
              
              <div className="input-grid">
                <div className="input-group full-width">
                  <label>Company Name</label>
                  <input
                    value={form.company}
                    onChange={e => updateField("company", e.target.value)}
                    placeholder="e.g. Google"
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Role / Position</label>
                  <input
                    value={form.role || form.position}
                    onChange={e => updateField("role", e.target.value)}
                    placeholder="e.g. Senior Frontend Engineer"
                    required
                  />
                </div>

                <div className="input-group">
                  <label><FiCalendar /> Duration</label>
                  <input
                    value={form.duration}
                    onChange={e => updateField("duration", e.target.value)}
                    placeholder="e.g. Jan 2022 - Present"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="editor-glass-section">
              <div className="section-header-compact">
                <FiAlignLeft className="section-icon" />
                <h3>Responsibilities & Achievements</h3>
              </div>
              
              <div className="input-group full-width">
                <label>Description (One bullet point per line)</label>
                <textarea
                  rows="8"
                  value={form.description}
                  onChange={e => updateField("description", e.target.value)}
                  placeholder="• Developed new features for the core product&#10;• Led a team of 3 developers"
                  required
                />
                <p className="helper-text" style={{fontSize: '0.8rem', color: 'var(--admin-text-dim)', marginTop: '0.5rem'}}>
                  Each line will be rendered as a separate bullet point in your portfolio.
                </p>
              </div>
            </div>

            {/* Settings Section */}
            <div className="editor-glass-section">
              <div className="input-group">
                <label>Visibility Status</label>
                <div className="custom-select-wrapper">
                  <select
                    value={form.status}
                    onChange={e => updateField("status", e.target.value)}
                  >
                    <option value="draft">Draft (Hidden)</option>
                    <option value="published">Published (Live)</option>
                  </select>
                  <FiChevronDown className="select-arrow" />
                </div>
              </div>
            </div>

            <div className="form-actions-sticky">
              <button type="button" className="nexus-action-btn large" onClick={() => navigate(-1)}>
                Cancel
              </button>
              <button type="submit" className="admin-btn-primary large">
                <FiSave /> {id === "new" ? "Create Experience" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
