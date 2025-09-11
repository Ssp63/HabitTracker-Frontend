// src/pages/LoginPage.jsx

import { Link, Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const { user } = useAuth();

  // If already logged in, don't show the login page; redirect to dashboard.
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="container auth-page">
      <h2>Login to Your Account</h2>
      <LoginForm />

      <div className="auth-switch">
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;