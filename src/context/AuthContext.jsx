// src/context/AuthContext.jsx

import React, { createContext, useContext, useState } from 'react';

// 1. Create the Context
// This creates a Context object. When React renders a component that subscribes
// to this Context object it will read the current context value from the
// closest matching Provider above it in the tree.
const AuthContext = createContext(null);

// 2. Create the Provider Component
// This is a custom component that will wrap parts of our application
// (or the whole app) to provide the authentication state.
export function AuthProvider({ children }) {
  // We use useState to hold the user's authentication data.
  // Initially, the user is null, meaning they are not logged in.
  // The 'user' object will eventually hold the data we get from our API
  // upon login, like { _id, name, email, token }.
  const [user, setUser] = useState(null);

  // The 'login' and 'logout' functions will be used by our components
  // to update the authentication state. For now, they are placeholders.
  // We will implement their full logic (calling the API, saving to localStorage) in a later step.
  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
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