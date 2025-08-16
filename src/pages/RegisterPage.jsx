// src/pages/RegisterPage.jsx

import { Link } from 'react-router-dom';

function RegisterPage() {
  return (
    <div className="container auth-page">
      <h2>Create a New Account</h2>
      {/* 
        This form is also a placeholder. We will add fields for name, email,
        and password later.
      */}
      <form>
        <p>Registration form will go here.</p>
        <button type="submit" className="button">Create Account</button>
      </form>
      <div className="auth-switch">
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;