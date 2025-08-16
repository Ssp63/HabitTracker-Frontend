// src/App.jsx
// NEW: Import the routing components
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// NEW: Import our page components
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

// This is the new, cleaned-up root component for our application.
// We've removed all the boilerplate state, effects, and JSX.
function App() {
  // The 'return' statement contains the JSX that this component will render.
  return (
    <>
      {/* 
        The <Routes> component is the main container for all our routes.
        It will intelligently render the component of the first <Route>
        that matches the current URL.
      */}
      <Navbar />
      <main>
        <Routes>
          {/* Each <Route> defines a path and the component (element) to render */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
    </>
  );
}

// We must export the component to make it available for use in other files, like main.jsx.
export default App;