import ServiceCard from '../components/ServiceCard';
import { useAuth } from '../context/AuthContext';
import { SERVICES } from '../constants/services';

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();

  const getVisibleServices = () => {
    if (!isAuthenticated()) {
      // Home page for non-logged-in users should show platform overview and featured services only
      return SERVICES.filter((s) => s.featured);
    }
    // For logged-in users, show all (filtered by admin status in ServiceCard)
    return SERVICES;
  };

  const visibleServices = getVisibleServices();

  const groupedServices = visibleServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {});

  return (
    <div className="dashboard">
      {!isAuthenticated() && (
        <section className="platform-overview">
          <h1>Welcome to Services Portal</h1>
          <p>
            The centralized hub for all your automation, media, and smart home services.
            Explore our featured products below or sign in to access more services and community features.
          </p>
        </section>
      )}

      <div className="dashboard-header">
        <h1>{isAuthenticated() ? 'Your Services Dashboard' : 'Featured Services'}</h1>
        <p>
          {isAuthenticated()
            ? `Welcome back, ${user.name}! Access your services below.`
            : 'Take a look at some of our top services.'}
        </p>
      </div>

      {Object.entries(groupedServices).map(([category, items]) => (
        <section key={category} className="dashboard-section">
          <h2 className="dashboard-section-title">{category}</h2>
          <div className="services-grid">
            {items.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>
      ))}

      {!isAuthenticated() && (
        <div className="cta-section">
          <p>Want to see more? Join our community today!</p>
          <button className="btn btn-primary" onClick={() => window.location.href = '/signup'}>
            Sign Up Now
          </button>
        </div>
      )}
    </div>
  );
}
