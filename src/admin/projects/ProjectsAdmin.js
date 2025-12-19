import { useState } from "react";
import { getProjects, saveProjects } from "../../data/projectsStore";

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState(getProjects());

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: "New Project",
      description: "",
      tech: [],
      link: "",
      status: "draft"
    };

    const updated = [...projects, newProject];
    setProjects(updated);
    saveProjects(updated);
  };

  return (
    <div>
      <h3>Projects</h3>
      <button onClick={addProject}>Add Project</button>      {projects.map(p => (
        <div key={p.id}>
          <strong>{p.title}</strong> ({p.status})
          <button onClick={() => window.location.href = `/admin/projects/${p.id}`}>
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}
