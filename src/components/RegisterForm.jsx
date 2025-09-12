// src/components/RegisterForm.jsx

import React, { useState } from 'react';
import authService from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import toast from 'react-hot-toast';

function RegisterForm() {
  // Get the login function from AuthContext
  const { login } = useAuth();
  const navigate = useNavigate();

  // 1. STATE MANAGEMENT:
  // We use a single state object to hold all form data. This is cleaner
  // than managing three separate state variables for name, email, and password.
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Add state for error messages and loading state
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Destructure the values from formData for easier access in the JSX.
  const { name, email, password } = formData;

  // 2. ONCHANGE HANDLER:
  // This is a generic handler that updates the state for any input field.
  const onChange = (e) => {
    // We use the input's `name` attribute to know which field to update.
    // The syntax `[e.target.name]` is a "computed property name". It allows us
    // to use a variable as a key in an object literal.
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  // 3. ONSUBMIT HANDLER:
  // This function will be called when the form is submitted.
   const onSubmit = async (e) => {
    e.preventDefault();
    
    // Clear any previous errors
    setError('');
    setIsLoading(true);

    // Here, we'll wrap our API call in a try...catch block to handle
    // potential errors (like a user already existing).
    try {
      // We call the register function from our service, passing the form data.
      // We 'await' the result because it's an asynchronous operation.
      const responseData = await authService.register(formData);

      // If the registration is successful, the 'responseData' will contain
      // the user object and token from our backend.
      toast.success(`Welcome ${responseData.name}! Account created successfully.`);
      
      // Automatically log the user in and redirect them to the dashboard
      login(responseData);
      navigate('/dashboard', { replace: true });

    } catch (error) {
      // If our authService throws an error, we'll catch it here.
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.message.toLowerCase().includes('email already exists') || 
          error.message.toLowerCase().includes('user already exists')) {
        errorMessage = 'An account with this email already exists. Please try logging in instead.';
      } else if (error.message.toLowerCase().includes('password')) {
        errorMessage = 'Password must be at least 6 characters long.';
      } else if (error.message.toLowerCase().includes('network') || 
                 error.message.toLowerCase().includes('fetch')) {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
      setError(errorMessage);
      console.error('Registration failed:', error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    // We attach our onSubmit handler to the form element itself.
    <form onSubmit={onSubmit} className="auth-form">
      {/* Error Message */}
      {error && (
        <div className="alert alert-error" style={{
          color: '#721c24',
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '4px',
          padding: '12px',
          marginBottom: '16px'
        }}>
          {error}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name" // The 'name' attribute must match the state key.
          value={name} // The input's value is tied to our state.
          onChange={onChange} // The onChange handler updates the state.
          required
          disabled={isLoading}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={onChange}
          required
          disabled={isLoading}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={onChange}
          required
          minLength="6" // A simple client-side validation.
          disabled={isLoading}
        />
      </div>
      <button 
        type="submit" 
        className="button" 
        disabled={isLoading}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          opacity: isLoading ? 0.7 : 1,
          cursor: isLoading ? 'not-allowed' : 'pointer'
        }}
      >
        {isLoading && <Spinner size="small" />}
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  );
}

export default RegisterForm;