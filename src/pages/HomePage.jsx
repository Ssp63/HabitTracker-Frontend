// src/pages/HomePage.jsx

import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="container">
      <header>
        <h1 className="welcome-title">Welcome to Habitize</h1>
        <p>Your personal tool to build better habits and visualize your progress.</p>
      </header>
      <main>
        <p>Ready to get started?</p>
        <div className="cta-buttons">
          {/* 
            The <Link> component from react-router-dom enables client-side navigation.
            The 'to' prop specifies the destination path. This is the declarative
            way to navigate within your single-page application.
          */}
          <Link to="/register" className="button">
            Create an Account
          </Link>
          <Link to="/login" className="button button-secondary">
            Login
          </Link>
        </div>
      </main>
    </div>
  );
}

export default HomePage;