// src/components/Navbar.jsx

import React, { useState } from 'react';
// Import the Link component from react-router-dom for client-side navigation.
import { Link } from 'react-router-dom';

function Navbar() {
  // --- MOCK AUTHENTICATION STATE ---
  // In a real application, this state would come from a global context (like AuthContext).
  // For now, we use local state to simulate a logged-in or logged-out user.
  // We'll set it to `false` by default to see the guest view.
  // You can manually change this to `true` to test the logged-in view.
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    // The <nav> element is a semantically correct tag for a navigation section.
    <nav className="navbar">
      <div className="navbar-container">
        {/* The main brand link, always visible, pointing to the home page. */}
        <Link to="/" className="navbar-logo">
          HabitTracker
        </Link>

        {/* This is the core of our conditional rendering. */}
        {/* We use a ternary operator to check the `isLoggedIn` state. */}
        <ul className="nav-menu">
          {isLoggedIn ? (
            // --- AUTHENTICATED LINKS ---
            // This is a React Fragment (<>...</>). It's used to group elements
            // without adding an extra node to the DOM.
            <>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-links">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                {/* The logout button won't have functionality yet, but we can style it as a link. */}
                <button onClick={() => setIsLoggedIn(false)} className="nav-links-button">
                  Logout
                </button>
              </li>
            </>
          ) : (
            // --- GUEST LINKS ---
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