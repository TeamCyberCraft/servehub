import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SERVICES } from '../constants/services';

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const showAdminItems = isAdmin();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const groupedServices = SERVICES.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {});

  const renderNavItem = (item) => {
    if (item.adminOnly && !showAdminItems) return null;

    return (
      <NavLink
        key={item.path}
        to={item.path}
        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        onClick={onClose}
      >
        <span className="sidebar-link-icon">{item.icon}</span>
        <span className="sidebar-link-label">{item.title || item.label}</span>
        {item.adminOnly && <span className="admin-indicator">Admin</span>}
      </NavLink>
    );
  };

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">Services Portal</h2>
          <button className="sidebar-close" onClick={onClose}>×</button>
        </div>

        <nav className="sidebar-nav">
          {renderNavItem({ path: '/', label: 'Dashboard', icon: '🏠' })}
          {renderNavItem({ path: '/community', label: 'Community', icon: '💬' })}
          
          {showAdminItems && renderNavItem({ path: '/admin', label: 'Admin Panel', icon: '🛠️' })}

          {Object.entries(groupedServices).map(([category, items]) => {
            const visibleItems = items.filter(s => !s.adminOnly || showAdminItems);
            if (visibleItems.length === 0) return null;

            return (
              <div key={category} className="sidebar-category">
                <h3 className="sidebar-category-title">{category}</h3>
                {visibleItems.map(renderNavItem)}
              </div>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          {user ? (
            <div className="sidebar-user">
              <div className="sidebar-user-info">
                <span className="sidebar-user-name">{user.name}</span>
                <span className="sidebar-user-role">{user.role}</span>
              </div>
              <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="sidebar-auth-links">
              <NavLink to="/admin/login" className="btn btn-primary btn-sm" onClick={onClose}>
                Admin Login
              </NavLink>
              <NavLink to="/signup" className="btn btn-secondary btn-sm" onClick={onClose}>
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
