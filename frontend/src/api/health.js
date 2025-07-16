// frontend/src/api/health.js

/**
 * Fetches the backend health‑check.
 * @returns {Promise<{status: string, service: string}>}
 * @throws if the network request fails.
 */
export async function getHealth() {
  const res = await fetch('http://localhost:5000/api/health');
  if (!res.ok) {
    throw new Error(`Health check failed: ${res.status}`);
  }
  return res.json();
}
