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

const COLLECTION_NAME = "experience";

export async function getExperience() {
  try {
    const q = query(collection(db, COLLECTION_NAME));
    const querySnapshot = await getDocs(q);
    const experience = [];
    querySnapshot.forEach((doc) => {
      experience.push({ id: doc.id, ...doc.data() });
    });
    return experience;
  } catch (error) {
    console.error("Error getting experience: ", error);
    return [];
  }
}

export async function saveExperienceItem(item) {
  try {
    if (item.id) {
      const docRef = doc(db, COLLECTION_NAME, item.id);
      const { id, ...data } = item;
      await updateDoc(docRef, data);
      return item.id;
    } else {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), item);
      return docRef.id;
    }
  } catch (error) {
    console.error("Error saving experience item: ", error);
    throw error;
  }
}

export async function deleteExperienceItem(itemId) {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, itemId));
  } catch (error) {
    console.error("Error deleting experience item: ", error);
    throw error;
  }
}

// Legacy support
export function saveExperience(items) {
    console.warn("saveExperience is legacy.");
}
