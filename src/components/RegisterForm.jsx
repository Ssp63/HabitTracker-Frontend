// src/components/RegisterForm.jsx

import React, { useState } from 'react';
import authService from '../services/authService';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function RegisterForm() {
  // Get the login function from AuthContext
  const { login } = useAuth();

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
  const [loading, setLoading] = useState(false);

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
  };

  // 3. ONSUBMIT HANDLER:
  // This function will be called when the form is submitted.
   const onSubmit = async (e) => {
    e.preventDefault();
    
    // Clear any previous errors
    setError('');
    setLoading(true);

    // Here, we'll wrap our API call in a try...catch block to handle
    // potential errors (like a user already existing).
    try {
      // We call the register function from our service, passing the form data.
      // We 'await' the result because it's an asynchronous operation.
      const responseData = await authService.register(formData);

      // If the registration is successful, the 'responseData' will contain
      // the user object and token from our backend.
      console.log('Registration successful!', responseData);
      
      // Show a success toast message
      toast.success(`Welcome ${responseData.name}! Registration successful.`);
      
      // Automatically log the user in and redirect them to the dashboard
      login(responseData);

    } catch (error) {
      // If our authService throws an error, we'll catch it here.
      console.error('Registration failed:', error.message);
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    // We attach our onSubmit handler to the form element itself.
    <form onSubmit={onSubmit} className="auth-form">
      {error && (
        <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
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
          disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
        />
      </div>
      <button type="submit" className="button" disabled={loading}>
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  );
}

export default RegisterForm;