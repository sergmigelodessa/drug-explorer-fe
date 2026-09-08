/**
 * Custom Hook: useAskAi
 * Handles RAG "Ask AI" question flow with loading, error, and answer states
 */

import { useState, useCallback } from 'react';
import drugAPI from '../services/drugAPI';

const useAskAi = () => {
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const ask = useCallback(async (question) => {
    setLoading(true);
    setError(null);
    setAnswer(null);

    try {
      const result = await drugAPI.askAi(question);
      setAnswer(result);
      return result;
    } catch (err) {
      const isTimeout = err.code === 'ECONNABORTED';
      setError({
        message: isTimeout
          ? 'The AI is taking too long to respond. Please try again.'
          : err.response?.data?.message || err.message || 'Failed to get an answer',
        status: err.response?.status,
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setAnswer(null);
    setError(null);
    setLoading(false);
  }, []);

  return { answer, loading, error, ask, reset };
};

export default useAskAi;
