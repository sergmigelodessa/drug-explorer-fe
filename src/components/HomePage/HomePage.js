/**
 * Home Page Component
 * Landing page with overview of the application
 */

import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="container">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>💊 Drug Explorer</h1>
            <p className="tagline">
              Comprehensive drug information and search analytics platform
            </p>
            <p className="description">
              Efficiently search for medications, view detailed drug information,
              and monitor search analytics in real-time.
            </p>

            <Link to="/search" className="btn btn-primary btn-large">
              Start Searching
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <h2>Features</h2>
          <div className="features-grid">
            {/* Feature 1 */}
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Advanced Search</h3>
              <p>
                Search for drugs by name or keyword with optimized results
                including dosage and form information.
              </p>
              <Link to="/search" className="feature-link">
                Try Search →
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Analytics Dashboard</h3>
              <p>
                Monitor search performance, cache hit rates, and view statistics
                on the most popular drug searches.
              </p>
              <Link to="/analytics" className="feature-link">
                View Analytics →
              </Link>
            </div>

            {/* Feature 4 */}
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>Ask AI (Beta)</h3>
              <p>
                Ask a plain-English question and get an AI answer grounded in
                real drug label data, with sources cited. Not medical advice.
              </p>
              <Link to="/ask-ai" className="feature-link">
                Ask AI →
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="feature-card">
              <div className="feature-icon">📜</div>
              <h3>Search History</h3>
              <p>
                Track historical searches, view execution times, and analyze
                performance metrics for specific queries.
              </p>
              <Link to="/history" className="feature-link">
                View History →
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="quick-stats">
          <h2>Quick Navigation</h2>
          <div className="nav-cards">
            <Link to="/search" className="nav-card search-card">
              <span className="icon">🔍</span>
              <span className="label">Search Drugs</span>
            </Link>
            <Link to="/ask-ai" className="nav-card search-card">
              <span className="icon">🤖</span>
              <span className="label">Ask AI</span>
            </Link>
            <Link to="/analytics" className="nav-card analytics-card">
              <span className="icon">📊</span>
              <span className="label">View Analytics</span>
            </Link>
            <Link to="/history" className="nav-card history-card">
              <span className="icon">📜</span>
              <span className="label">Search History</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
