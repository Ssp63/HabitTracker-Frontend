// src/components/PrivateRoute.jsx

import React from 'react';
// Import the Navigate component from react-router-dom for declarative redirects.
import { Navigate } from 'react-router-dom';
// Import our custom useAuth hook to access the authentication context.
import { useAuth } from '../context/AuthContext';

// This is our wrapper component. It takes a 'children' prop.
// 'children' will be the component that we want to protect.
function PrivateRoute({ children }) {
  // Use the useAuth hook to get the current user from our global state.
  const { user } = useAuth();

  // Here is the core logic:
  // If the 'user' object exists (is not null), it means the user is logged in.
  // In this case, we render the 'children' components that were passed into this route.
  // This grants them access to the protected page.
  if (user) {
    return children;
  }

  // If the 'user' object is null, it means the user is not logged in.
  // We do not render the children. Instead, we render the <Navigate> component.
  // The 'to' prop tells React Router where to redirect the user.
  // The 'replace' prop is a good practice for login redirects. It replaces the
  // current entry in the history stack instead of pushing a new one. This means
  // when the user clicks the browser's back button from the login page, they
  // won't be sent back to the protected route they were just kicked out of.
  return <Navigate to="/login" replace />;
}

export default PrivateRoute;