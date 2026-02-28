// PERSON C OWNS THIS FILE
// Snowflake credentials NEVER live in the frontend
// All calls go through our Express server (server/index.js)
// Backend URL: VITE_BACKEND_URL in root .env

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

export async function fetchPathsForBuilding(buildingName) {
  const res = await fetch(`${BACKEND_URL}/api/paths/${encodeURIComponent(buildingName)}`);
  if (!res.ok) throw new Error(`Fetch paths failed: ${res.status}`);
  return res.json();
}

export async function savePath(buildingName, geminiSummary, pathData = {}) {
  const res = await fetch(`${BACKEND_URL}/api/paths`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ buildingName, geminiSummary, pathData })
  });
  if (!res.ok) throw new Error(`Save path failed: ${res.status}`);
  return res.json();
}

export async function getAllBuildings() {
  const res = await fetch(`${BACKEND_URL}/api/buildings`);
  if (!res.ok) throw new Error(`Fetch buildings failed: ${res.status}`);
  return res.json();
}
