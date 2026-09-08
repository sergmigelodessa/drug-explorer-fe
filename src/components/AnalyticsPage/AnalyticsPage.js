/**
 * Analytics Page Component
 * Displays search statistics and analytics
 * Best Practice: Data visualization, auto-refresh capability
 */

import React, { useState } from 'react';
import { useAnalytics } from '../../hooks';
import { Spinner, ErrorAlert } from '../../components/common';
import '../../styles/AnalyticsPage.css';

const AnalyticsPage = () => {
  const { data, loading, error, refetch } = useAnalytics();
  const [autoRefresh, setAutoRefresh] = useState(false);

  /**
   * Handle manual refresh
   */
  const handleRefresh = () => {
    refetch();
  };

  /**
   * Toggle auto-refresh feature
   */
  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
  };

  return (
    <div className="analytics-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1>Analytics Dashboard</h1>
          <p className="subtitle">
            Monitoring search performance and usage statistics
          </p>
        </div>

        {/* Controls */}
        <div className="analytics-controls">
          <button
            className="btn btn-primary"
            onClick={handleRefresh}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </button>
          <label className="auto-refresh-toggle">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={toggleAutoRefresh}
              disabled={loading}
            />
            Auto-refresh every 30s
          </label>
        </div>

        {/* Error State */}
        {error && (
          <ErrorAlert
            error={error}
            onDismiss={() => refetch()}
          />
        )}

        {/* Loading State */}
        {loading && <Spinner message="Loading analytics..." />}

        {/* Analytics Data */}
        {data && !loading && (
          <div className="analytics-content">
            {/* Key Metrics */}
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-value">{data.totalSearches}</div>
                <div className="metric-label">Total Searches</div>
              </div>

              <div className="metric-card">
                <div className="metric-value">{data.cacheHits}</div>
                <div className="metric-label">Cache Hits</div>
              </div>

              <div className="metric-card">
                <div className="metric-value">
                  {data.cacheHitRate.toFixed(2)}%
                </div>
                <div className="metric-label">Cache Hit Rate</div>
              </div>

              <div className="metric-card">
                <div className="metric-value">
                  {data.averageExecutionTimeMs.toFixed(2)}ms
                </div>
                <div className="metric-label">Avg Execution Time</div>
              </div>
            </div>

            {/* Top Queries */}
            {data.topQueries && data.topQueries.length > 0 && (
              <div className="top-queries-section">
                <h2>Top Search Queries</h2>
                <div className="queries-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Query</th>
                        <th>Search Count</th>
                        <th>Cache Hits</th>
                        <th>Avg Time (ms)</th>
                        <th>Last Searched</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.topQueries.map((query, index) => (
                        <tr key={index} className="query-row">
                          <td className="query-name">
                            {query.normalizedQuery}
                          </td>
                          <td className="query-count">
                            {query.searchCount}
                          </td>
                          <td className="query-cache-hits">
                            {query.cacheHitCount}
                          </td>
                          <td className="query-time">
                            {query.averageExecutionTimeMs.toFixed(2)}
                          </td>
                          <td className="query-date">
                            {formatDate(query.lastSearchedAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Empty Top Queries */}
            {(!data.topQueries || data.topQueries.length === 0) && (
              <div className="no-data">
                <p>No search queries yet</p>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!data && !loading && !error && (
          <div className="empty-state">
            <p>No analytics data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Utility function to format date
 */
const formatDate = (dateString) => {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return 'N/A';
  }
};

export default AnalyticsPage;
