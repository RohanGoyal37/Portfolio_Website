import { useState } from "react";
import { getExperience, saveExperience } from "../../data/experienceStore";

export default function ExperienceAdmin() {
  const [items, setItems] = useState(getExperience());

  const addItem = () => {
    const newItem = {
      id: Date.now().toString(),
      company: "Company Name",
      role: "",
      duration: "",
      description: "",
      status: "draft"
    };

    const updated = [...items, newItem];
    setItems(updated);
    saveExperience(updated);
  };

  return (
    <div>
      <h3>Experience</h3>
      <button onClick={addItem}>Add Experience</button>

      {items.map(i => (
        <div key={i.id}>
          <strong>{i.company}</strong> — {i.role}
          <button onClick={() => window.location.href = `/admin/experience/${i.id}`}>
            Edit
          </button>
        </div>
      ))}

    </div>
  );
}
