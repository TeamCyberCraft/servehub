import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { SERVICES, SERVICE_STATUS } from '../constants/services';
import AdminForms from '../components/AdminForms';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [managedServices, setManagedServices] = useState(SERVICES);
  const [editingService, setEditingService] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSave = (serviceData) => {
    if (editingService) {
      setManagedServices(managedServices.map(s => s.id === editingService.id ? { ...serviceData, id: s.id } : s));
      setEditingService(null);
    } else {
      const newService = { ...serviceData, id: Date.now().toString() };
      setManagedServices([...managedServices, newService]);
      setShowAddForm(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setManagedServices(managedServices.filter(s => s.id !== id));
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, {user?.name}!</p>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Services</h3>
            <p className="stat-value">{managedServices.length}</p>
            <p className="stat-label">Total services</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Users</h3>
            <p className="stat-value">24</p>
            <p className="stat-label">Registered users</p>
          </div>
        </div>
      </div>

      <div className="admin-sections">
        <section className="admin-section">
          <div className="section-header">
            <h2>Service Management</h2>
            <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>Add New Service</button>
          </div>

          {showAddForm && (
            <AdminForms onSave={handleSave} onCancel={() => setShowAddForm(false)} />
          )}

          {editingService && (
            <AdminForms service={editingService} onSave={handleSave} onCancel={() => setEditingService(null)} />
          )}

          <div className="services-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Visibility</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {managedServices.map((service) => (
                  <tr key={service.id}>
                    <td>
                      <div className="table-service-info">
                        <span>{service.icon}</span>
                        <div>
                          <strong>{service.title}</strong>
                          <p>{service.path}</p>
                        </div>
                      </div>
                    </td>
                    <td>{service.category}</td>
                    <td>
                      <span className={`status-pill ${service.status === SERVICE_STATUS.MAINTENANCE ? 'maintenance' : 'active'}`}>
                        {service.status}
                      </span>
                    </td>
                    <td>{service.adminOnly ? '🔒 Admin' : '👥 Public'}</td>
                    <td>
                      <div className="table-actions">
                        <button className="btn-icon" onClick={() => setEditingService(service)} title="Edit">✏️</button>
                        <button className="btn-icon btn-danger" onClick={() => handleDelete(service.id)} title="Delete">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="admin-section">
          <h2>Community Moderation</h2>
          <div className="moderation-controls">
            <div className="moderation-card">
              <h3>Recent Messages</h3>
              <p>Moderate user chats across the platform.</p>
              <button className="btn btn-secondary">Review Messages</button>
            </div>
            <div className="moderation-card">
              <h3>Ratings & Reviews</h3>
              <p>Manage and delete service ratings.</p>
              <button className="btn btn-secondary">Review Ratings</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
