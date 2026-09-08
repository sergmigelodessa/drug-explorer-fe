/**
 * Navigation Component
 * Main menu for the application
 * Best Practice: Clean navigation with active state indication
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/Navigation.css';

const Navigation = () => {
  const location = useLocation();

  /**
   * Check if current route is active
   */
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <Link to="/" className="navbar-brand">
          💊 Drug Explorer
        </Link>

        {/* Navigation Links */}
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link
              to="/search"
              className={`navbar-link ${isActive('/search')}`}
            >
              🔍 Search
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              to="/ask-ai"
              className={`navbar-link ${isActive('/ask-ai')}`}
            >
              🤖 Ask AI
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              to="/analytics"
              className={`navbar-link ${isActive('/analytics')}`}
            >
              📊 Analytics
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              to="/history"
              className={`navbar-link ${isActive('/history')}`}
            >
              📜 History
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
