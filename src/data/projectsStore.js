import { db } from "../firebase/config";
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  query
} from "firebase/firestore";

const COLLECTION_NAME = "projects";

export async function getProjects() {
  try {
    const q = query(collection(db, COLLECTION_NAME));
    const querySnapshot = await getDocs(q);
    const projects = [];
    querySnapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() });
    });
    return projects;
  } catch (error) {
    console.error("Error getting projects: ", error);
    return [];
  }
}

export async function saveProject(project) {
  try {
    if (project.id) {
      const docRef = doc(db, COLLECTION_NAME, project.id);
      const { id, ...data } = project;
      await updateDoc(docRef, data);
      return project.id;
    } else {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), project);
      return docRef.id;
    }
  } catch (error) {
    console.error("Error saving project: ", error);
    throw error;
  }
}

export async function deleteProject(projectId) {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, projectId));
  } catch (error) {
    console.error("Error deleting project: ", error);
    throw error;
  }
}

// For compatibility with existing code during migration
export function saveProjects(projects) {
  // This is now legacy. Use saveProject for individual updates.
  console.warn("saveProjects is legacy. Use saveProject instead.");
}
