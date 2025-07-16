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


// frontend/src/api/health.js

/**
 * Fetches the backend health-check endpoint.
 * @returns {Promise<{status: string, service: string}>}
 * @throws {Error} if the response status is not OK.
 */
export async function getHealth() {
  // The base URL is injected by Vite from your .env (VITE_API_URL=http://localhost:5000)
  const base = import.meta.env.VITE_API_URL;
  const res = await fetch(`${base}/health`);

  if (!res.ok) {
    // Forward HTTP error for caller to catch
    throw new Error(res.statusText || `HTTP ${res.status}`);
  }

  // Parse and return JSON payload
  return res.json();
}
