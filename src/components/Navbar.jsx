// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';

// NEW: Import our custom useAuth hook
import { useAuth } from '../context/AuthContext';

function Navbar() {
  // NEW: Use the useAuth hook to get the user state and logout function
  // We no longer need the local `useState` for isLoggedIn.
  const { user, logout } = useAuth();

  const handleLogout = () => {
    // This will call the logout function from our AuthContext
    logout();
    // In a future step, this will also clear localStorage and redirect the user.
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          HabitTracker
        </Link>
        <ul className="nav-menu">
          {/* 
            The conditional rendering logic is now much more meaningful.
            Instead of checking a mock state, we check if the 'user' object
            from our global context exists.
          */}
          {user ? (
            // Authenticated Links
            <>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-links">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-links-button">
                  Logout
                </button>
              </li>
            </>
          ) : (
            // Guest Links
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-links">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-links">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;