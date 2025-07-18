// frontend/src/api/auth.js
import axios from 'axios';

// Resolve backend base URL from Vite env at build/runtime.
// docker-compose sets VITE_API_URL=http://backend:5000 (container-to-container).
// When running locally outside Docker, we fall back to http://localhost:5000.
const API_BASE =
  import.meta?.env?.VITE_API_URL?.replace(/\/+$/, '') || 'http://localhost:5000';

const LOGIN_ENDPOINT = `${API_BASE}/api/auth/login`;

/**
 * Login API call
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{token: string, user: {email: string, id: number}}>}
 */
export async function login(email, password) {
  try {
    const res = await axios.post(
      LOGIN_ENDPOINT,
      { email, password },
      {
        headers: { 'Content-Type': 'application/json' },
        // With our CORS config, no special withCredentials is required yet.
        // withCredentials: true, // (enable later if we move to cookie auth)
      }
    );

    // Basic shape validation (defensive)
    const data = res?.data;
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response from server.');
    }
    if (!data.token || !data.user) {
      throw new Error('Login response missing token or user.');
    }
    return data;
  } catch (err) {
    // Normalize error messages
    if (err.response) {
      // Server returned error status
      const msg =
        err.response.data?.error ||
        err.response.data?.message ||
        `Login failed (status ${err.response.status}).`;
      throw new Error(msg);
    }
    if (err.request) {
      // No response received
      throw new Error('Network error contacting login service.');
    }
    // Something else (e.g., code error)
    throw new Error(err.message || 'Unknown login error.');
  }
}
