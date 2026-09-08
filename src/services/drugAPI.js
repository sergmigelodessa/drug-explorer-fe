/**
 * Drug API Service - All drug-related API endpoints
 * Best Practice: Separate API calls into service layer for reusability
 */

import apiClient from './apiClient';

const drugAPI = {
  /**
   * Search for drugs by query string
   * @param {string} query - Search query (min 2 chars, max 256 chars)
   * @returns {Promise<Object>} - Drug search results
   * @throws {Error} - API errors
   */
  searchDrugs: async (query) => {
    if (!query || query.length < 2) {
      throw new Error('Query must be at least 2 characters long');
    }
    if (query.length > 256) {
      throw new Error('Query cannot exceed 256 characters');
    }
    
    const response = await apiClient.get('/drugs/search', {
      params: { query },
    });
    return response.data;
  },

  /**
   * Get search analytics and statistics
   * @returns {Promise<Object>} - Analytics data
   * @throws {Error} - API errors
   */
  getAnalytics: async () => {
    const response = await apiClient.get('/drugs/analytics');
    return response.data;
  },

  /**
   * Get search history for a specific query
   * @param {string} normalizedQuery - The query to get history for
   * @param {number} limit - Maximum records to return (1-1000)
   * @returns {Promise<Array>} - History records
   * @throws {Error} - API errors
   */
  getSearchHistory: async (normalizedQuery, limit = 50) => {
    if (!normalizedQuery) {
      throw new Error('Query parameter is required');
    }
    if (limit < 1 || limit > 1000) {
      throw new Error('Limit must be between 1 and 1000');
    }

    const response = await apiClient.get('/drugs/history', {
      params: { normalizedQuery, limit },
    });
    return response.data;
  },

  /**
   * Semantic (AI meaning-based) search over ingested drug label text
   * @param {string} query - Free-text query or description (min 2 chars)
   * @param {number} topK - Maximum number of distinct drugs to return
   * @returns {Promise<Object>} - Semantic search results
   * @throws {Error} - API errors
   */
  semanticSearch: async (query, topK = 10) => {
    if (!query || query.length < 2) {
      throw new Error('Query must be at least 2 characters long');
    }

    const response = await apiClient.get('/drugs/semantic-search', {
      params: { query, topK },
    });
    return response.data;
  },

  /**
   * Ask a free-text question and get an AI answer grounded in drug label text (RAG)
   * Uses a longer timeout because local LLM generation can take up to a minute.
   * @param {string} question - The question to ask (3-512 chars)
   * @returns {Promise<Object>} - { answer, grounded, sources }
   * @throws {Error} - API errors
   */
  askAi: async (question) => {
    if (!question || question.length < 3) {
      throw new Error('Question must be at least 3 characters long');
    }
    if (question.length > 512) {
      throw new Error('Question cannot exceed 512 characters');
    }

    const response = await apiClient.post(
      '/drugs/ask',
      { question },
      { timeout: 120000 }
    );
    return response.data;
  },
};

export default drugAPI;
