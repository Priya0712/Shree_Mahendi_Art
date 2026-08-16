import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  
  // In development, you can toggle this or check localStorage directly
  const token = localStorage.getItem('adminToken');
  
  if (!isAuthenticated && !token) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
