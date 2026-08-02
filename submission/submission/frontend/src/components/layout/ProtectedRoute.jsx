import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { token, user } = useAuth();

  // If token or user profile is missing, redirect to the login portal
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // If allowed roles list is specified and user's role is not matching, redirect to dashboard
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
