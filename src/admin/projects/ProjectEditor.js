import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getProjects, saveProjects } from "../../data/projectsStore";

export default function ProjectEditor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const projects = getProjects();
  const project = projects.find(p => p.id === id);

  const [form, setForm] = useState(
    project
      ? {
        ...project,
        tech: Array.isArray(project.tech)
          ? project.tech.join(", ")
          : project.tech || ""
      }
      : {
        title: "",
        description: "",
        tech: "",
        link: "",
        status: "draft"
      }
  );

  if (!project) {
    return <p>Project not found</p>;
  }

  const updateField = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const save = () => {
    const updated = projects.map(p =>
      p.id === id
        ? {
          ...form,
          tech:
            typeof form.tech === "string"
              ? form.tech.split(",").map(t => t.trim()).filter(Boolean)
              : []
        }
        : p
    );

    saveProjects(updated);
    navigate("/admin/projects");
  };

  return (
    <div>
      <h3>Edit Project</h3>

      <label>Title</label>
      <input
        value={form.title}
        onChange={e => updateField("title", e.target.value)}
      />

      <label>Description</label>
      <textarea
        value={form.description}
        onChange={e => updateField("description", e.target.value)}
      />

      <label>Tech Stack (comma separated)</label>
      <input
        value={form.tech}
        onChange={e => updateField("tech", e.target.value)}
      />

      <label>Live / GitHub Link</label>
      <input
        value={form.link}
        onChange={e => updateField("link", e.target.value)}
      />

      <label>Status</label>
      <select
        value={form.status}
        onChange={e => updateField("status", e.target.value)}
      >
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>

      <br /><br />
      <button onClick={save}>Save</button>
      <button onClick={() => navigate(-1)}>Cancel</button>
    </div>
  );
}
