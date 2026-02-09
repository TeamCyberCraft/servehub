import { createContext, useContext, useState } from 'react';
import { ROLES } from '../constants/roles';

const AuthContext = createContext(null);

function getInitialUser() {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      return JSON.parse(storedUser);
    } catch {
      localStorage.removeItem('user');
    }
  }
  return null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);

  const login = (email, password, isAdmin = false) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (isAdmin) {
          if (email === 'admin@example.com' && password === 'admin123') {
            const userData = { email, role: ROLES.ADMIN, name: 'Admin User' };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            resolve(userData);
          } else {
            reject(new Error('Invalid admin credentials'));
          }
        } else {
          const userData = { email, role: ROLES.USER, name: email.split('@')[0] };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          resolve(userData);
        }
      }, 500);
    });
  };

  const signup = (email, password, name) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password || !name) {
          reject(new Error('All fields are required'));
          return;
        }
        const userData = { email, role: ROLES.USER, name };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        resolve(userData);
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAdmin = () => user?.role === ROLES.ADMIN;
  const isAuthenticated = () => !!user;

  const value = {
    user,
    loading: false,
    login,
    signup,
    logout,
    isAdmin,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
