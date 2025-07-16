/**
 * Fetches the backend health-check endpoint.
 * @returns {Promise<{status: string, service: string}>}
 * @throws {Error} if the response status is not OK.
 */
export async function getHealth() {
  // hit the relative URL; Vite will forward it
  const res = await fetch("/api/health");
  if (!res.ok) {
    // Forward HTTP error for caller to catch
    throw new Error(res.statusText || `HTTP ${res.status}`);
  }

  // Parse and return JSON payload
  return res.json();
}
