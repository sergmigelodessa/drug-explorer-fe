/**
 * Custom Hook: useAnalytics
 * Fetches and manages analytics data
 * Best Practice: Separates data fetching logic from UI components
 */

import { useState, useEffect, useCallback } from 'react';
import drugAPI from '../services/drugAPI';

const useAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch analytics data
   */
  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await drugAPI.getAnalytics();
      setData(result);
    } catch (err) {
      setError({
        message: err.message || 'Failed to load analytics',
        status: err.response?.status,
        data: err.response?.data,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Auto-fetch analytics on component mount
   */
  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  /**
   * Manual refresh function
   */
  const refetch = useCallback(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return { data, loading, error, refetch };
};

export default useAnalytics;
