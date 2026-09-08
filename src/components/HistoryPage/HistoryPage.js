/**
 * History Page Component
 * Displays search history for specific queries
 * Best Practice: Filtering, pagination-ready, proper state management
 */

import React, { useState, useCallback } from 'react';
import { useSearchHistory } from '../../hooks';
import { Spinner, ErrorAlert } from '../../components/common';
import '../../styles/HistoryPage.css';

const HistoryPage = () => {
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(50);
  const { data, loading, error, fetchHistory, clearData } = useSearchHistory();

  /**
   * Handle search submission
   */
  const handleSearch = useCallback(
    async (e) => {
      e.preventDefault();

      if (!query.trim()) {
        return;
      }

      await fetchHistory(query, limit);
    },
    [query, limit, fetchHistory]
  );

  /**
   * Handle input change
   */
  const handleInputChange = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  /**
   * Handle limit change
   */
  const handleLimitChange = useCallback((e) => {
    setLimit(parseInt(e.target.value, 10));
  }, []);

  /**
   * Handle clear
   */
  const handleClear = useCallback(() => {
    setQuery('');
    clearData();
  }, [clearData]);

  return (
    <div className="history-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1>Search History</h1>
          <p className="subtitle">
            View historical search results and performance metrics
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="history-search-form">
          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="query-input">Query</label>
              <input
                id="query-input"
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Enter a normalized query"
                className="form-input"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="limit-input">Results Limit</label>
              <select
                id="limit-input"
                value={limit}
                onChange={handleLimitChange}
                className="form-input"
                disabled={loading}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="500">500</option>
                <option value="1000">1000</option>
              </select>
            </div>

            <div className="form-buttons">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading || query.trim().length === 0}
              >
                {loading ? 'Loading...' : 'Fetch History'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClear}
                disabled={loading}
              >
                Clear
              </button>
            </div>
          </div>
        </form>

        {/* Error State */}
        {error && (
          <ErrorAlert
            error={error}
            onDismiss={() => clearData()}
          />
        )}

        {/* Loading State */}
        {loading && <Spinner message="Loading history..." />}

        {/* History Results */}
        {data && !loading && (
          <div className="history-results">
            {data.length > 0 ? (
              <>
                <div className="results-header">
                  <h2>Results for "{query}"</h2>
                  <span className="results-count">
                    {data.length} record{data.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="history-table-container">
                  <table className="history-table">
                    <thead>
                      <tr>
                        <th>Query Text</th>
                        <th>Result Count</th>
                        <th>Execution Time</th>
                        <th>Cache Hit</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((record) => (
                        <tr key={record.id} className="history-row">
                          <td className="query-text">
                            {record.queryText}
                          </td>
                          <td className="result-count">
                            {record.resultCount}
                          </td>
                          <td className="execution-time">
                            {record.executionTimeMs}ms
                          </td>
                          <td className="cache-hit">
                            <span className={`cache-badge ${record.cacheHit ? 'hit' : 'miss'}`}>
                              {record.cacheHit ? '✓ Hit' : '✗ Miss'}
                            </span>
                          </td>
                          <td className="created-date">
                            {formatDate(record.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="no-results">
                <p>No history found for "{query}"</p>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {(!data || data.length === 0) && !loading && !error && (
          <div className="empty-state">
            <p>👆 Enter a query above to view search history</p>
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

export default HistoryPage;
