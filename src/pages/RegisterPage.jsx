// src/pages/RegisterPage.jsx

import { Link, Navigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import { useAuth } from '../context/AuthContext';

function RegisterPage() {
  const { user } = useAuth();

  // If already logged in, skip register page.
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="container auth-page">
      <h2>Create a New Account</h2>
      <RegisterForm />

      <div className="auth-switch">
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;