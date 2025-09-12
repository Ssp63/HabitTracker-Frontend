// src/components/LoginForm.jsx

import React, { useState } from 'react';
import authService from '../services/authService';
import Spinner from './Spinner';
import toast from 'react-hot-toast';

import {useAuth} from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


function LoginForm() {
  // 1. STATE MANAGEMENT:
  // We mirror the pattern from RegisterForm, but with a simpler state object
  // containing only the fields we need for login: email and password.
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Add state for loading and error
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Destructure for easy access in the JSX.
  const { email, password } = formData;
 const { login } = useAuth();
  const navigate = useNavigate();
  // 2. ONCHANGE HANDLER:
  // This is the *exact same* generic handler from RegisterForm. Its reusability
  // is a key benefit of this pattern. It updates the state based on the
  // `name` attribute of the input that triggered the change.
  const onChange = (e) => {
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

    // Clear any existing error messages
    setError('');
    setIsLoading(true);

    // We wrap our API call in a try...catch block to handle potential
    // errors returned from the backend, such as "Invalid credentials".
    try {
      // Call the login function from our service, passing the form data.
      // We 'await' the result, pausing the function until the API call completes.
      const userData = await authService.login(formData);

      // If the login is successful, 'userData' will contain the user object
      // and the JWT from our backend.
      toast.success(`Welcome back, ${userData.name || 'User'}! Login successful.`);
      login(userData);
      
      // Navigate immediately since toast will show the success message
      navigate('/dashboard', { replace: true });

    } catch (error) {
      // If authService throws an error (e.g., a 401 Unauthorized response),
      // we catch it here and show user-friendly messages.
      let errorMessage = 'An unexpected error occurred. Please try again.';
      
      if (error.message.toLowerCase().includes('invalid credentials') || 
          error.message.toLowerCase().includes('unauthorized')) {
        errorMessage = 'Invalid email or password. Please check your credentials and try again.';
      } else if (error.message.toLowerCase().includes('network') || 
                 error.message.toLowerCase().includes('fetch')) {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      } else if (error.message.toLowerCase().includes('user not found')) {
        errorMessage = 'No account found with this email address. Please check your email or register for a new account.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
      setError(errorMessage);
      console.error('Login failed:', error.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    // We attach our onSubmit handler to the form. The className allows us
    // to reuse the same styles we created for the registration form.
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
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email" // 'name' attribute must match the state key.
          value={email} // Value is controlled by our React state.
          onChange={onChange} // Updates state when the user types.
          disabled={isLoading}
          required
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
          disabled={isLoading}
          required
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
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

export default LoginForm;