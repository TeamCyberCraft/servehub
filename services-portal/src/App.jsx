import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ROLES } from './constants/roles';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import NotFound from './pages/NotFound';
import { routes } from './routes/routes';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth routes (outside layout) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Main layout routes */}
          <Route path="/" element={<Layout />}>
            {/* Dashboard */}
            <Route index element={<Dashboard />} />

            {/* Admin Dashboard */}
            <Route
              path="admin"
              element={
                <ProtectedRoute requiredRole={ROLES.ADMIN}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Public routes */}
            {routes.public.filter(r => r.component).map(route => (
              <Route key={route.path} path={route.path} element={<route.component />} />
            ))}

            {/* Service routes */}
            {routes.services.map((route) => {
              const Component = route.component;
              if (route.adminOnly) {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      <ProtectedRoute requiredRole={ROLES.ADMIN}>
                        <Component />
                      </ProtectedRoute>
                    }
                  />
                );
              }
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<Component />}
                />
              );
            })}

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
