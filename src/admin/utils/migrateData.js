import { db } from "../../firebase/config";
import { collection, addDoc, getDocs, query, limit } from "firebase/firestore";
import projectsData from "../../components/Projects/projects.json";

export async function migrateProjects() {
  const collectionRef = collection(db, "projects");
  
  // Check if already migrated
  const q = query(collectionRef, limit(1));
  const snapshot = await getDocs(q);
  
  if (!snapshot.empty) {
    console.log("Projects already migrated or collection not empty.");
    return { success: false, message: "Already migrated" };
  }

  console.log("Starting migration of projects...");
  let count = 0;
  for (const project of projectsData) {
    const data = {
      name: project.name || "Untitled",
      description: project.description || "",
      technologies: project.technologies || [],
      link: project.link || "",
      demo: project.demo || "",
      category: project.category || "General",
      image: project.image || null,
      size: project.size || "square",
      status: "published", // Default to published for migrated data
      createdAt: new Date().toISOString()
    };
    await addDoc(collectionRef, data);
    count++;
  }

  console.log(`Migration complete. ${count} projects added.`);
  return { success: true, count };
}
