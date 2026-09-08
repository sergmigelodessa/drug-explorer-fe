/**
 * Custom Hook: useDrugSearch
 * Handles drug search logic with loading, error, and data states
 * Best Practice: Reusable logic encapsulated in a custom hook
 */

import { useState, useCallback } from 'react';
import drugAPI from '../services/drugAPI';

const useDrugSearch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Execute search with proper state management
   * @param {string} query - Search query
   */
  const search = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await drugAPI.searchDrugs(query);
      setData(result);
      return result;
    } catch (err) {
      setError({
        message: err.response?.data?.message || err.message || 'Search failed',
        status: err.response?.status,
        data: err.response?.data,
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Reset state
   */
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, search, reset };
};

export default useDrugSearch;
