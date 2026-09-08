/**
 * API Service - Centralized API configuration and instance
 * Best Practice: Single source of truth for all API communication
 */

import axios from 'axios';

// Configure base URL for API (adjust based on your environment)
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Create axios instance with default configuration
 * Benefits:
 * - Centralized configuration
 * - Easier to add interceptors
 * - Simpler to test
 */
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Response interceptor for handling common error scenarios
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error codes
    if (error.response?.status === 400) {
      console.error('Bad Request:', error.response.data);
    } else if (error.response?.status === 500) {
      console.error('Server Error:', error.response.data);
    } else if (error.response?.status === 502) {
      console.error('Bad Gateway - External API Error');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
