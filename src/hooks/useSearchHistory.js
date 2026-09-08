/**
 * Custom Hook: useSearchHistory
 * Fetches and manages search history data
 * Best Practice: Handles pagination and filtering logic
 */

import { useState, useCallback } from 'react';
import drugAPI from '../services/drugAPI';

const useSearchHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch history for a specific query
   * @param {string} normalizedQuery - Query to get history for
   * @param {number} limit - Maximum records to return
   */
  const fetchHistory = useCallback(async (normalizedQuery, limit = 50) => {
    setLoading(true);
    setError(null);

    try {
      const result = await drugAPI.getSearchHistory(normalizedQuery, limit);
      setData(result);
    } catch (err) {
      setError({
        message: err.message || 'Failed to load history',
        status: err.response?.status,
        data: err.response?.data,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Clear history data
   */
  const clearData = useCallback(() => {
    setData([]);
    setError(null);
  }, []);

  return { data, loading, error, fetchHistory, clearData };
};

export default useSearchHistory;
