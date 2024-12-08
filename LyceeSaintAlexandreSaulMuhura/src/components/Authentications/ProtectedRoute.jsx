import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  // Check for authentication token in localStorage
  const isAuthenticated = localStorage.getItem('authToken');

  useEffect(() => {
    // Logging for debugging
    console.log('Protected Route Check:');
    console.log('Authentication Token:', isAuthenticated);
    console.log('Current Location:', location.pathname);
  }, [isAuthenticated, location]);

  // If authenticated, render the children (protected components)
  // If not authenticated, redirect to login page with the current location state
  if (!isAuthenticated) {
    console.warn('User not authenticated. Redirecting to login.');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Additional token validation (optional but recommended)
  try {
    // If you're using JWT, you might want to decode and check token expiration
    // This is a placeholder - replace with actual token validation logic
    const token = localStorage.getItem('authToken');
    if (!isValidToken(token)) {
      console.warn('Invalid or expired token');
      localStorage.removeItem('authToken');
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  } catch (error) {
    console.error('Token validation error:', error);
    localStorage.removeItem('authToken');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Placeholder function for token validation
const isValidToken = (token) => {
  // Implement actual token validation logic
  // For example, check if token exists and is not expired
  return !!token; // Simple existence check - replace with proper validation
};

export default ProtectedRoute;