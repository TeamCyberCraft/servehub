import express from 'express';
import cors from 'cors';
import { SERVICES, SERVICE_STATUS } from './data/services.js';
import { MemoryStore } from './store/memoryStore.js';

const logger = {
  info: (...args) => console.info('[api]', ...args),
  warn: (...args) => console.warn('[api]', ...args),
  error: (...args) => console.error('[api]', ...args),
  debug: (...args) => console.debug('[api]', ...args),
};

function findService(id) {
  return SERVICES.find((s) => s.id === id);
}

function getUserFromHeaders(req) {
  const authHeader = req.header('authorization');
  const devToken = process.env.DEV_API_TOKEN;
  if (devToken && authHeader?.startsWith('Bearer ')) {
    const token = authHeader.substring('Bearer '.length);
    if (token === devToken) {
      return { email: 'dev@local', role: 'admin', name: 'Dev User' };
    }
  }

  const trustHeaders = process.env.TRUST_AUTH_HEADERS === 'true';
  if (!trustHeaders) return null;

  const email = req.header('x-user') || null;
  const role = req.header('x-role') || 'user';
  return email ? { email, role, name: email.split('@')[0] } : null;
}

function getUserDisplayName(user) {
  return user?.name || user?.email || 'anonymous';
}

export class ApiServer {
  constructor({ port = process.env.PORT || 4000 } = {}) {
    this.port = port;
    this.app = express();
    this.store = new MemoryStore();
    this.configure();
    this.registerRoutes();
  }

  configure() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  registerRoutes() {
    const app = this.app;

    // Health
    app.get('/api/health', (req, res) => {
      res.json({ status: 'ok', uptime: process.uptime() });
    });

    // Auth (stubbed; real auth handled by Authelia)
    app.post('/api/auth/login', (req, res) => {
      const { email } = req.body || {};
      if (!email) return res.status(400).json({ error: 'email required' });
      if (process.env.ALLOW_DEMO_AUTH !== 'true') {
        return res.status(501).json({ error: 'Demo login is disabled. Use Authelia gateway authentication.' });
      }
      return res.json({ token: 'mock-token', user: { email, role: 'user', name: email.split('@')[0] } });
    });

    app.post('/api/auth/admin/login', (_req, res) => {
      return res.status(403).json({ error: 'Admin login is handled by Authelia. Use gateway authentication.' });
    });

    app.post('/api/auth/signup', (_req, res) => {
      res.status(403).json({ error: 'Signup is managed by Authelia. Use the gateway to provision users.' });
    });

    app.post('/api/auth/logout', (_req, res) => res.status(204).send());

    app.get('/api/auth/me', (req, res) => {
      const user = getUserFromHeaders(req);
      if (!user) return res.status(401).json({ error: 'Unauthenticated' });
      return res.json({ user });
    });

    // Services catalog
    app.get('/api/services', (_req, res) => {
      res.json({ services: SERVICES });
    });

    app.get('/api/services/:serviceId', (req, res) => {
      const service = findService(req.params.serviceId);
      if (!service) return res.status(404).json({ error: 'Service not found' });
      res.json({ service });
    });

    app.get('/api/services/:serviceId/health', (req, res) => {
      const service = findService(req.params.serviceId);
      if (!service) return res.status(404).json({ error: 'Service not found' });
      res.json({ serviceId: service.id, status: service.status || SERVICE_STATUS.ACTIVE });
    });

    // Ratings
    app.get('/api/services/:serviceId/ratings', (req, res) => {
      const service = findService(req.params.serviceId);
      if (!service) return res.status(404).json({ error: 'Service not found' });
      const summary = this.store.getRatingSummary(service.id);
      res.json({ serviceId: service.id, ...summary });
    });

    app.post('/api/services/:serviceId/ratings', (req, res) => {
      const service = findService(req.params.serviceId);
      if (!service) return res.status(404).json({ error: 'Service not found' });
      const user = getUserFromHeaders(req);
      if (!user) return res.status(401).json({ error: 'Authentication required' });
      const rating = Number(req.body?.rating);
      try {
        const entry = this.store.addRating(service.id, rating, getUserDisplayName(user));
        res.status(201).json({ rating: entry });
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    });

    // Service messages
    app.get('/api/services/:serviceId/messages', (req, res) => {
      const service = findService(req.params.serviceId);
      if (!service) return res.status(404).json({ error: 'Service not found' });
      const messages = this.store.getMessages(service.id);
      res.json({ serviceId: service.id, messages });
    });

    app.post('/api/services/:serviceId/messages', (req, res) => {
      const service = findService(req.params.serviceId);
      if (!service) return res.status(404).json({ error: 'Service not found' });
      const user = getUserFromHeaders(req);
      if (!user) return res.status(401).json({ error: 'Authentication required' });
      const text = (req.body?.text || '').trim();
      if (!text) return res.status(400).json({ error: 'text is required' });
      const entry = this.store.addMessage(service.id, text, getUserDisplayName(user));
      res.status(201).json({ message: entry });
    });

    // Community messages
    app.get('/api/community/messages', (_req, res) => {
      const messages = this.store.getMessages('community');
      res.json({ context: 'community', messages });
    });

    app.post('/api/community/messages', (req, res) => {
      const user = getUserFromHeaders(req);
      if (!user) return res.status(401).json({ error: 'Authentication required' });
      const text = (req.body?.text || '').trim();
      if (!text) return res.status(400).json({ error: 'text is required' });
      const entry = this.store.addMessage('community', text, getUserDisplayName(user));
      res.status(201).json({ message: entry });
    });
  }

  start() {
    return this.app.listen(this.port, () => {
      logger.info(`API server listening on port ${this.port}`);
    });
  }
}
