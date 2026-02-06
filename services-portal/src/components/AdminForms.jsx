import { useState } from 'react';
import { SERVICE_STATUS } from '../constants/services';

export default function AdminForms({ service, onSave, onCancel }) {
  const [formData, setFormData] = useState(service || {
    title: '',
    path: '',
    category: '',
    icon: '📦',
    description: '',
    status: SERVICE_STATUS.ACTIVE,
    adminOnly: false,
    featured: false,
    wallpaper: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h3>{service ? 'Edit Service' : 'Add New Service'}</h3>
      
      <div className="form-group">
        <label>Service Name</label>
        <input name="title" value={formData.title} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Path</label>
        <input name="path" value={formData.path} onChange={handleChange} required placeholder="/data/apps/..." />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="Automation & APIs">Automation & APIs</option>
          <option value="Smart Home">Smart Home</option>
          <option value="Version Control">Version Control</option>
          <option value="Media">Media</option>
          <option value="Dashboards">Dashboards</option>
          <option value="Monitoring">Monitoring</option>
        </select>
      </div>

      <div className="form-group">
        <label>Icon (Emoji)</label>
        <input name="icon" value={formData.icon} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value={SERVICE_STATUS.ACTIVE}>{SERVICE_STATUS.ACTIVE}</option>
          <option value={SERVICE_STATUS.MAINTENANCE}>{SERVICE_STATUS.MAINTENANCE}</option>
        </select>
      </div>

      <div className="form-group-checkbox">
        <label>
          <input type="checkbox" name="adminOnly" checked={formData.adminOnly} onChange={handleChange} />
          Admin Only
        </label>
      </div>

      <div className="form-group-checkbox">
        <label>
          <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
          Featured Product
        </label>
      </div>

      <div className="form-group">
        <label>Wallpaper URL</label>
        <input name="wallpaper" value={formData.wallpaper} onChange={handleChange} />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Save Service</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
