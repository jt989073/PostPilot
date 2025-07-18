const KEY = 'postpilot_auth';

export function saveAuth({ token, user }) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ token, user }));
  } catch {
    /* ignore storage errors */
  }
}

export function loadAuth() {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.token) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearAuth() {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
