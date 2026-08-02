// Centralized API Base URL configuration for RuralGrow AI
// Vercel deployments must call the separately hosted Render API. Falling back
// to window.location on Vercel would request /api from the static SPA instead.
const RENDER_API_URL = 'https://ruralgrow-ai.onrender.com';

const getBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== 'undefined') {
    const { hostname, origin } = window.location;
    if (hostname.endsWith('.onrender.com')) return origin;
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') return RENDER_API_URL;
  }
  return 'http://localhost:5000';
};

export const API_BASE_URL = getBaseUrl().replace(/\/$/, '');

/**
 * Utility helper to construct absolute API endpoints.
 * @param {string} path - Relative endpoint path (e.g. '/api/auth/login')
 * @returns {string} - Full API URL
 */
export const getApiUrl = (path) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
};

export default API_BASE_URL;
