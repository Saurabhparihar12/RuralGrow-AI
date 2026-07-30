// Centralized API Base URL configuration for RuralGrow AI
// Supports dynamic window.location origin fallback for unified monorepo hosting (Render/Vercel)

const getBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // If running in browser on production domain (e.g. *.onrender.com or *.vercel.app), use current origin!
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return window.location.origin;
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
