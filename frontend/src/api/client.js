// frontend/src/api/client.js

// Grab the base from our env (falls back to window.location.origin)
const BASE = import.meta.env.VITE_API_URL || window.location.origin;

/**
 * A thin wrapper around fetch that:
 *  • prefixes the path with our BASE URL
 *  • automatically JSON‐parses a successful response
 *  • throws an Error on non‐2xx
 */
export async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    // Try to read and bubble up error details
    let errMsg;
    try {
      const errBody = await res.json();
      errMsg = errBody.error || JSON.stringify(errBody);
    } catch {
      errMsg = await res.text();
    }
    throw new Error(`API ${res.status}: ${errMsg}`);
  }

  // No content (204) → return null
  if (res.status === 204) return null;
  return res.json();
}
