import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getProjects, saveProject } from "../../data/projectsStore";
import { uploadImage } from "../utils/uploadImage";
import { motion } from "framer-motion";
import { FiSave, FiArrowLeft, FiImage, FiChevronDown, FiGlobe, FiGithub, FiInfo, FiCode, FiUpload, FiX } from "react-icons/fi";

export default function ProjectEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(id !== "new");
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState(["Web Dev", "AI/ML", "App Dev", "Data Science"]);
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  
  const [form, setForm] = useState({
    name: "",
    description: "",
    technologies: "",
    link: "",
    demo: "",
    category: "",
    status: "draft",
    size: "square",
    image: "",
    privateRepo: false
  });

  useEffect(() => {
    const fetchProjectAndCategories = async () => {
      const projects = await getProjects();
      
      const existingCats = Array.from(new Set(
        projects.map(p => p.category).filter(Boolean)
      ));
      
      const baseCategories = ["Web Dev", "AI/ML", "App Dev", "Data Science"];
      const combinedCategories = Array.from(new Set([...baseCategories, ...existingCats]));
      
      setCategories(combinedCategories);

      const project = projects.find(p => p.id === id);
      if (project) {
        setForm({
          ...project,
          name: project.name || project.title || "",
          technologies: Array.isArray(project.technologies) 
            ? project.technologies.join(", ") 
            : project.technologies || ""
        });
        
        if (project.category && !combinedCategories.includes(project.category)) {
          setShowCustomCategory(true);
        }
      }
      setLoading(false);
    };

    fetchProjectAndCategories();
  }, [id]);

  const updateField = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const downloadURL = await uploadImage(file, "projects");
      updateField("image", downloadURL);
    } catch (error) {
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const dataToSave = {
      ...form,
      technologies: typeof form.technologies === "string" 
        ? form.technologies.split(",").map(t => t.trim()).filter(Boolean)
        : form.technologies
    };
    
    if (id !== "new") dataToSave.id = id;

    await saveProject(dataToSave);
    navigate("/admin/projects");
  };

  if (loading) return (
    <div className="admin-loading-state">
      <div className="spinner"></div>
      <p>Opening the editor...</p>
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
          <span>Projects</span>
          <span className="separator">/</span>
          <span className="current">{id === "new" ? "New" : "Edit"}</span>
        </div>
        <div className="top-bar-actions">
          <button className="nexus-action-btn" onClick={() => navigate("/admin/projects")}>
            <FiArrowLeft />
          </button>
        </div>
      </div>

      <div className="editor-layout-grid">
        <div className="editor-main-column">
          <form onSubmit={handleSave}>
            {/* Basic Info Section */}
            <div className="editor-glass-section">
              <div className="section-header-compact">
                <FiInfo className="section-icon" />
                <h3>Project Fundamentals</h3>
              </div>
              
              <div className="input-grid">
                <div className="input-group full-width">
                  <label>Project Name</label>
                  <input
                    value={form.name}
                    onChange={e => updateField("name", e.target.value)}
                    placeholder="Enter project name..."
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Category</label>
                  {!showCustomCategory ? (
                    <div className="custom-select-wrapper">
                      <select
                        value={form.category}
                        onChange={e => {
                          if (e.target.value === "custom") {
                            setShowCustomCategory(true);
                            updateField("category", "");
                          } else {
                            updateField("category", e.target.value);
                          }
                        }}
                        required
                      >
                        <option value="" disabled>Select Category</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                        <option value="custom">+ Custom Category</option>
                      </select>
                      <FiChevronDown className="select-arrow" />
                    </div>
                  ) : (
                    <div className="custom-input-with-button">
                      <input
                        value={form.category}
                        onChange={e => updateField("category", e.target.value)}
                        placeholder="Type category..."
                        autoFocus
                        required
                      />
                      <button type="button" onClick={() => setShowCustomCategory(false)}>
                        <FiChevronDown />
                      </button>
                    </div>
                  )}
                </div>

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

              <div className="input-group full-width" style={{marginTop: '1.5rem'}}>
                <label>Description</label>
                <textarea
                  rows="4"
                  value={form.description}
                  onChange={e => updateField("description", e.target.value)}
                  placeholder="Tell the story behind this project..."
                  required
                />
              </div>
            </div>

            {/* Technical Section */}
            <div className="editor-glass-section">
              <div className="section-header-compact">
                <FiCode className="section-icon" />
                <h3>Technical Stack</h3>
              </div>
              <div className="input-group full-width">
                <label>Technologies (Comma separated)</label>
                <input
                  value={form.technologies}
                  onChange={e => updateField("technologies", e.target.value)}
                  placeholder="React, Node.js, GraphQL..."
                />
              </div>
            </div>

            {/* Links Section */}
            <div className="editor-glass-section">
              <div className="section-header-compact">
                <FiGlobe className="section-icon" />
                <h3>Project Links</h3>
              </div>
              <div className="input-grid">
                <div className="input-group">
                  <label><FiGithub /> GitHub Repository</label>
                  <input
                    value={form.link}
                    onChange={e => updateField("link", e.target.value)}
                    placeholder="https://github.com/..."
                  />
                </div>
                <div className="input-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={form.privateRepo}
                      onChange={e => updateField("privateRepo", e.target.checked)}
                    />
                    Private Repo
                  </label>
                </div>
                <div className="input-group">
                  <label><FiGlobe /> Live Demo</label>
                  <input
                    value={form.demo}
                    onChange={e => updateField("demo", e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>

            <div className="form-actions-sticky">
              <button type="button" className="nexus-action-btn large" onClick={() => navigate(-1)}>
                Cancel
              </button>
              <button type="submit" className="admin-btn-primary large" disabled={uploading}>
                <FiSave /> {id === "new" ? "Create Project" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar Column for Media */}
        <div className="editor-side-column">
          <div className="editor-glass-section sticky-preview">
            <div className="section-header-compact">
              <FiImage className="section-icon" />
              <h3>Cover Image</h3>
            </div>
            
            <div className="media-upload-preview">
              {uploading ? (
                <div className="media-placeholder">
                  <div className="spinner"></div>
                  <span>Uploading...</span>
                </div>
              ) : form.image ? (
                <>
                  <img 
                    src={form.image.startsWith('http') ? form.image : process.env.PUBLIC_URL + form.image} 
                    alt="Preview" 
                  />
                  <button className="remove-media" onClick={() => updateField("image", "")}>
                    <FiX />
                  </button>
                </>
              ) : (
                <div className="media-placeholder" onClick={() => fileInputRef.current.click()}>
                  <FiImage size={48} />
                  <span>No image selected</span>
                  <p>Click to upload</p>
                </div>
              )}
            </div>

            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept="image/*"
              onChange={handleImageUpload}
            />

            <button 
              type="button" 
              className="admin-btn-secondary full-width" 
              style={{ marginTop: '1rem' }}
              onClick={() => fileInputRef.current.click()}
              disabled={uploading}
            >
              <FiUpload /> {form.image ? "Change Image" : "Upload Image"}
            </button>

            <div className="input-group full-width" style={{marginTop: '1.5rem'}}>
              <label>Or Image URL / Path</label>
              <input
                value={form.image}
                onChange={e => updateField("image", e.target.value)}
                placeholder="/projects/filename.png"
              />
              <p className="helper-text">You can upload an image or paste a link directly.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
