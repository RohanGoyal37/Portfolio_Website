import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getExperience, saveExperience } from "../../data/experienceStore";

export default function ExperienceEditor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const experience = getExperience();
  const item = experience.find(e => e.id === id);

  const [form, setForm] = useState(item);

  if (!item) return <p>Experience not found</p>;

  const updateField = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const save = () => {
    const updated = experience.map(e =>
      e.id === id ? form : e
    );

    saveExperience(updated);
    navigate("/admin/experience");
  };

  return (
    <div>
      <h3>Edit Experience</h3>

      <label>Company</label>
      <input
        value={form.company}
        onChange={e => updateField("company", e.target.value)}
      />

      <label>Role</label>
      <input
        value={form.role}
        onChange={e => updateField("role", e.target.value)}
      />

      <label>Duration</label>
      <input
        value={form.duration}
        onChange={e => updateField("duration", e.target.value)}
      />

      <label>Description</label>
      <textarea
        value={form.description}
        onChange={e => updateField("description", e.target.value)}
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
