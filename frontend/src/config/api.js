// Centralized API Base URL configuration for RuralGrow AI
// Supports VITE_API_URL environment variable for production deployments (e.g. Render)
export const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

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
