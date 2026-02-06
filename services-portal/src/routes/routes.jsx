import { ROLES } from '../constants/roles';
import { SERVICES } from '../constants/services';
import ServicePage from '../pages/ServicePage';
import CommunityPage from '../pages/CommunityPage';
import Login from '../pages/Login';

// Centralized route configuration
export const routes = {
  // Public routes
  public: [
    { path: '/signup', label: 'Sign Up' },
    { path: '/login', label: 'Login', component: Login },
    { path: '/admin/login', label: 'Admin Login' },
    { path: '/community', label: 'Community', component: CommunityPage },
  ],

  // Protected routes (admin only)
  admin: [
    { path: '/admin', label: 'Admin Dashboard', requiredRole: ROLES.ADMIN },
  ],

  // Service routes (mapped from SERVICES constants)
  services: SERVICES.map(service => ({
    ...service,
    component: ServicePage,
  })),
};

// Helper to get all routes for sitemap generation
export function getAllRoutes() {
  const allRoutes = [
    '/',
    ...routes.public.map((r) => r.path),
    ...routes.admin.map((r) => r.path),
    ...routes.services.map((r) => r.path),
  ];
  return allRoutes;
}

// Helper to get admin-only routes
export function getAdminOnlyRoutes() {
  return routes.services
    .filter((r) => r.adminOnly)
    .map((r) => r.path);
}

export default routes;
