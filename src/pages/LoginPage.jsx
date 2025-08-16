// src/pages/LoginPage.jsx

import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <div className="container auth-page">
      <h2>Login to Your Account</h2>
      {/* 
        This form is a placeholder. In a future step, we will add state management,
        input fields for email and password, and a submit handler.
      */}
      <form>
        <p>Login form will go here.</p>
        <button type="submit" className="button">Login</button>
      </form>
      <div className="auth-switch">
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;