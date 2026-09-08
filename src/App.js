/**
 * Main App Component
 * Application routing and layout configuration
 * Best Practice: Centralized routing, proper structure
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import HomePage from './components/HomePage/HomePage';
import SearchPage from './components/SearchPage/SearchPage';
import AskAiPage from './components/AskAiPage/AskAiPage';
import AnalyticsPage from './components/AnalyticsPage/AnalyticsPage';
import HistoryPage from './components/HistoryPage/HistoryPage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        {/* Navigation Header */}
        <Navigation />

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/ask-ai" element={<AskAiPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/history" element={<HistoryPage />} />
            {/* 404 Not Found - Fallback Route */}
            <Route
              path="*"
              element={
                <div className="container page-404">
                  <h1>404 - Page Not Found</h1>
                  <p>The page you're looking for doesn't exist.</p>
                </div>
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <p>&copy; 2026 Drug Explorer. Built with React & ASP.NET API.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
