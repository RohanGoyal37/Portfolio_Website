import { storage } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * Uploads an image to Firebase Storage and returns the download URL.
 * @param {File} file - The file object to upload
 * @param {string} folder - The folder path in storage (e.g. 'projects')
 * @returns {Promise<string>} - The download URL
 */
export async function uploadImage(file, folder = "projects") {
  if (!file) return null;

  try {
    // Create a unique filename to avoid overwrites
    const timestamp = Date.now();
    const cleanName = file.name.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
    const fileName = `${timestamp}_${cleanName}`;
    
    const storageRef = ref(storage, `${folder}/${fileName}`);
    
    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get and return the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}
