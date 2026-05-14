import { auth } from "../../firebase/config";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const ADMIN_KEY = "is_admin_logged_in";

export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem(ADMIN_KEY, "true");
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: error.message };
  }
}

export async function logout() {
  try {
    await signOut(auth);
    localStorage.removeItem(ADMIN_KEY);
  } catch (error) {
    console.error("Logout error:", error);
  }
}

export function isAdmin() {
  // We check both Firebase state (if available) and localStorage for persistence
  return auth.currentUser !== null || localStorage.getItem(ADMIN_KEY) === "true";
}

// Optional: Listener to sync localStorage with Auth state
onAuthStateChanged(auth, (user) => {
  if (user) {
    localStorage.setItem(ADMIN_KEY, "true");
  } else {
    localStorage.removeItem(ADMIN_KEY);
  }
});
