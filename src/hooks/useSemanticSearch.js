/**
 * Custom Hook: useSemanticSearch
 * Handles AI (meaning-based) drug search with loading, error, and data states
 */

import { useState, useCallback } from 'react';
import drugAPI from '../services/drugAPI';

const useSemanticSearch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = useCallback(async (query, topK = 10) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await drugAPI.semanticSearch(query, topK);
      setData(result);
      return result;
    } catch (err) {
      setError({
        message: err.response?.data?.message || err.message || 'Smart search failed',
        status: err.response?.status,
        data: err.response?.data,
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, search, reset };
};

export default useSemanticSearch;
