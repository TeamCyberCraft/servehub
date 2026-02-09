import { useLocation, useNavigate } from 'react-router-dom';
import { SERVICES, SERVICE_STATUS } from '../constants/services';
import Rating from '../components/Rating';
import Chat from '../components/Chat';

export default function ServicePage() {
  const location = useLocation();
  const navigate = useNavigate();
  // Find service by current path
  const service = SERVICES.find(s => s.path === location.pathname);

  if (!service) {
    return (
      <div className="error-page">
        <h1>Service Not Found</h1>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  const { title, description, status, category, featured, path } = service;

  return (
    <div className="service-page">
      <div className="page-header" style={{ backgroundImage: service.wallpaper ? `url(${service.wallpaper})` : 'none' }}>
        <div className="page-header-overlay">
          <div className="page-header-icon">{service.icon}</div>
          <div className="page-header-content">
            <div className="category-tag">{category}</div>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          <div className={`status-badge ${status === SERVICE_STATUS.MAINTENANCE ? 'maintenance' : 'active'}`}>
            {status}
          </div>
        </div>
      </div>

      <div className="service-content">
        <div className="service-main">
          <section className="service-section">
            <h2>Overview</h2>
            <p>
              This is the {title} service management page. As part of our {category} suite, 
              this service provides robust functionality for your needs.
            </p>
            {featured && <p className="featured-tag">🌟 Featured Product</p>}
          </section>

          <section className="service-section">
            <h2>Community Feedback</h2>
            <div className="feedback-container">
              <div className="rating-box">
                <h3>Rate this Service</h3>
                <Rating serviceId={service.id} />
              </div>
              <div className="chat-box">
                <h3>Service Chat</h3>
                <Chat contextId={service.id} type="service" />
              </div>
            </div>
          </section>
        </div>

        <aside className="service-sidebar">
          <section className="service-section">
            <h2>Actions</h2>
            <div className="service-actions-vertical">
              <button className="btn btn-primary">Open Interface</button>
              <button className="btn btn-secondary">Documentation</button>
              <button className="btn btn-secondary">Support</button>
            </div>
          </section>

          <section className="service-section">
            <h2>Service Info</h2>
            <div className="info-list">
              <div className="info-item">
                <span className="label">Category:</span>
                <span className="value">{category}</span>
              </div>
              <div className="info-item">
                <span className="label">Status:</span>
                <span className="value">{status}</span>
              </div>
              <div className="info-item">
                <span className="label">Portal Path:</span>
                <span className="value">{path}</span>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
