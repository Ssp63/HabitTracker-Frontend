// src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Create the Auth Context
export const AuthContext = createContext(null);

// Create the Auth Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const navigate = useNavigate();
  const location = useLocation();

  // Check if token is expired
  const isTokenExpired = useCallback((token) => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch (e) {
      return true;
    }
  }, []);

  // Validate user function
  const validateUser = useCallback(() => {
    const storedUser = localStorage.getItem('user');
    const currentPath = location.pathname;
    const publicPaths = ['/login', '/register', '/'];
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (isTokenExpired(parsedUser?.token)) {
        localStorage.removeItem('user');
        setUser(null);
        if (!publicPaths.includes(currentPath)) {
          navigate('/login', { replace: true });
        }
      } else {
        setUser(parsedUser);
        if (publicPaths.includes(currentPath)) {
          navigate('/dashboard', { replace: true });
        }
      }
    } else {
      setUser(null);
      if (!publicPaths.includes(currentPath)) {
        navigate('/login', { replace: true });
      }
    }
  }, [isTokenExpired, location.pathname, navigate]);

  // Set up effect to validate user on mount and when location changes
  useEffect(() => {
    validateUser();
    
    // Set up storage event listener to handle changes from other tabs
    const handleStorageChange = (e) => {
      if (e.key === 'user') {
        validateUser();
      }
    };

    // Set up interval to check token expiration periodically
    const interval = setInterval(validateUser, 5 * 60 * 1000); // Check every 5 minutes
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [validateUser]);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    navigate('/dashboard', { replace: true });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login', { replace: true });
  };

  // The 'value' object contains the state and the functions to update it.
  // This is what will be made available to all child components.
  const value = { user, login, logout };

  return (
    // The Provider component takes a `value` prop to be passed to consuming
    // components that are descendants of this Provider.
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Create a Custom Hook for easy consumption
// This is a best practice. Instead of components importing `useContext` and `AuthContext`
// separately, they can just use this single `useAuth` hook.
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}