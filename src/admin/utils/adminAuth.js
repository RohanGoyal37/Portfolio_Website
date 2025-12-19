const ADMIN_KEY = "is_admin_logged_in";

export function login(password) {
  if (password === "admin123") {
    localStorage.setItem(ADMIN_KEY, "true");
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem(ADMIN_KEY);
}

export function isAdmin() {
  return localStorage.getItem(ADMIN_KEY) === "true";
}
