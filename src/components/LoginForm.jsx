// src/components/LoginForm.jsx

import React, { useState } from 'react';
import authService from '../services/authService';

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
  };

  // 3. ONSUBMIT HANDLER:
  // This function will be called when the form is submitted.
   const onSubmit = async (e) => {
    e.preventDefault();

    // We wrap our API call in a try...catch block to handle potential
    // errors returned from the backend, such as "Invalid credentials".
    try {
      // Call the login function from our service, passing the form data.
      // We 'await' the result, pausing the function until the API call completes.
      const userData = await authService.login(formData);

      // If the login is successful, 'userData' will contain the user object
      // and the JWT from our backend.
       console.log('Login successful!', userData);
    login(userData);
      
      // The very next task will be to take this `userData` and use it
      // to update our global AuthContext and save the token.
  navigate('/dashboard', { replace: true });

    } catch (error) {
      // If authService throws an error (e.g., a 401 Unauthorized response),
      // we catch it here.
      console.error('Login failed:', error.message);
      // In a real application, you'd set an error state here to display
      // a message like "Invalid credentials" in the UI.
    }
  };


  return (
    // We attach our onSubmit handler to the form. The className allows us
    // to reuse the same styles we created for the registration form.
    <form onSubmit={onSubmit} className="auth-form">
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email" // 'name' attribute must match the state key.
          value={email} // Value is controlled by our React state.
          onChange={onChange} // Updates state when the user types.
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
          required
        />
      </div>
      <button type="submit" className="button">
        Login
      </button>
    </form>
  );
}

export default LoginForm;