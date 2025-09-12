// src/services/api.js

import axios from 'axios';

// Determine the base URL based on environment
const getBaseURL = () => {
  // Check if we're in development mode
  if (import.meta.env.DEV) {
    return 'http://localhost:3000/api';
  }
  
  // In production, use the environment variable or default Azure URL
  return import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
};

// Create a new axios instance with a predefined configuration.
// This is a best practice for creating a configurable, centralized
// API layer.
const api = axios.create({
  // Sets the base URL for all requests made with this instance.
  // Now, instead of writing `axios.post('http://localhost:5000/api/users/login')`,
  // we can just write `api.post('/users/login')`.
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Request Interceptor ---
// This function will be called for every single request that goes out.
api.interceptors.request.use(
  (config) => {
    // Before the request is sent, we retrieve the user object from localStorage.
    const user = JSON.parse(localStorage.getItem('user'));

    // If the user and their token exist...
    if (user && user.token) {
      // ...we add the Authorization header to the request's configuration.
      // The `config.headers` object is where all headers for the request are stored.
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    
    // It is crucial to return the config object.
    // If we don't, the request will be blocked.
    return config;
  },
  (error) => {
    // This function handles any errors that occur during the request setup.
    // We return a rejected Promise to propagate the error.
    return Promise.reject(error);
  }
);

export default api;