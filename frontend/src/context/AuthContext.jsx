import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(false);

  // Sync token and user in localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Login handler
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Login failed.' };
      }
    } catch (err) {
      return { success: false, message: 'Could not connect to authentication server.' };
    } finally {
      setLoading(false);
    }
  };

  // Signup/Register handler
  const signup = async (name, email, password, role, shopName) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role, shopName })
      });
      const data = await res.json();
      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Registration failed.' };
      }
    } catch (err) {
      return { success: false, message: 'Could not connect to registration server.' };
    } finally {
      setLoading(false);
    }
  };

  // Simulated Google Sign-In handler (for development and test sandboxes)
  const googleLoginSimulated = async (name, email, avatar) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/google-simulated', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, avatar })
      });
      const data = await res.json();
      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Google Login failed.' };
      }
    } catch (err) {
      return { success: false, message: 'Could not connect to authentication server.' };
    } finally {
      setLoading(false);
    }
  };

  // Direct login using parameters (for Google OAuth callback redirects)
  const loginWithParams = (authToken, userMetadata) => {
    setToken(authToken);
    setUser(userMetadata);
  };

  // Logout handler
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Forgot password handler
  const forgotPassword = async (email) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (data.success) {
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Failed to trigger recovery.' };
      }
    } catch (err) {
      return { success: false, message: 'Could not connect to password recovery server.' };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      token, 
      user, 
      setUser, 
      login, 
      signup, 
      googleLoginSimulated,
      loginWithParams,
      logout, 
      forgotPassword, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
