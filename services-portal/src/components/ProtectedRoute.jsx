import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../constants/roles';

export default function ProtectedRoute({ children, requiredRole = null }) {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Check if user is authenticated
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Check if admin role is required
  if (requiredRole === ROLES.ADMIN && user?.role !== ROLES.ADMIN) {
    return (
      <div className="access-denied">
        <div className="access-denied-content">
          <h1>Access Denied</h1>
          <p>You do not have permission to view this page.</p>
          <p>This area is restricted to administrators only.</p>
          <a href="/" className="btn btn-primary">Return to Home</a>
        </div>
      </div>
    );
  }

  return children;
}
