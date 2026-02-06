import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header({ onMenuClick }) {
  const { user, isAdmin } = useAuth();

  return (
    <header className="header">
      <button className="header-menu-btn" onClick={onMenuClick} aria-label="Open menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <Link to="/" className="header-logo">
        Services Portal
      </Link>
      <div className="header-actions">
        {user ? (
          <div className="header-user">
            <span className="header-user-name">{user.name}</span>
            {isAdmin() && <span className="header-admin-badge">Admin</span>}
          </div>
        ) : (
          <Link to="/admin/login" className="btn btn-primary btn-sm">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
