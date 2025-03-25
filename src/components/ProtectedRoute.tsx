import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import React from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <p>Loading...</p>;

  return isAuthenticated ? children : <Navigate to="/" replace />;
}
