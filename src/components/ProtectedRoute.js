import React from 'react';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ 
  children, 
  fallback = <div>Please log in to access this page.</div> 
}) => {
  const { isAuthenticated, isInitialized } = useSelector((state) => state.auth);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : fallback;
};

export default ProtectedRoute;