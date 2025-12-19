const STORAGE_KEY = "portfolio_experience";

export function getExperience() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  return [];
}

export function saveExperience(experience) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(experience));
}
