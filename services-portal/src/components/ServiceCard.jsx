import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../constants/roles';
import { SERVICE_STATUS } from '../constants/services';

export default function ServiceCard({ service }) {
  const { title, description, path, icon, adminOnly, status } = service;
  const { isAdmin } = useAuth();

  // Don't show admin-only services to non-admin users
  if (adminOnly && !isAdmin()) {
    return null;
  }

  return (
    <Link to={path} className="service-card">
      <div className="service-card-icon">{icon}</div>
      <div className="service-card-content">
        <h3 className="service-card-title">
          {title}
          {adminOnly && <span className="admin-badge">Admin</span>}
        </h3>
        <p className="service-card-description">{description}</p>
        <div className={`status-badge ${status === SERVICE_STATUS.MAINTENANCE ? 'maintenance' : 'active'}`}>
          {status}
        </div>
      </div>
      <div className="service-card-arrow">→</div>
    </Link>
  );
}
