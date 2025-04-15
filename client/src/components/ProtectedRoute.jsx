import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// This component is used to protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  // Get authentication state and loading status
  const { currentUser, loading } = useAuth();

  // If we're still checking authentication status, show loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect to login page
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute;