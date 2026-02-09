const withServiceId = (template, serviceId = ':serviceId') =>
  template.replace(':serviceId', serviceId);

export const API_ROUTES = {
  health: '/api/health',
  auth: {
    login: '/api/auth/login',
    signup: '/api/auth/signup',
    adminLogin: '/api/auth/admin/login',
    logout: '/api/auth/logout',
    profile: '/api/auth/me',
  },
  services: {
    list: '/api/services',
    detail: '/api/services/:serviceId',
    health: '/api/services/:serviceId/health',
    ratings: '/api/services/:serviceId/ratings',
    messages: '/api/services/:serviceId/messages',
  },
  community: {
    messages: '/api/community/messages',
  },
};

export function getServiceApiEndpoints(serviceId) {
  const id = serviceId || ':serviceId';
  return [
    { label: 'Service details', method: 'GET', path: withServiceId(API_ROUTES.services.detail, id) },
    { label: 'Health check', method: 'GET', path: withServiceId(API_ROUTES.services.health, id) },
    { label: 'Ratings', method: 'POST', path: withServiceId(API_ROUTES.services.ratings, id) },
    { label: 'Messages', method: 'GET/POST', path: withServiceId(API_ROUTES.services.messages, id) },
  ];
}
