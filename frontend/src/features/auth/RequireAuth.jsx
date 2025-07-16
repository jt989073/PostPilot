// src/features/auth/RequireAuth.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * A wrapper component that protects routes by checking for a valid auth token.
 * If no token is found, redirects to /login, preserving the attempted URL.
 */
const RequireAuth = ({ children }) => {
  // Pull the token from auth state
  const token = useSelector(state => state.auth.token);
  const location = useLocation();

  if (!token) {
    // Redirect to login, store current location in state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render protected children if authenticated
  return children;
};

export default RequireAuth;
