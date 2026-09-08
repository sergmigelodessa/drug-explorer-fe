/**
 * Type definitions and interfaces for the Drug Explorer API
 * These define the structure of data received from the backend
 */

// Drug variant information
export const DrugVariant = {
  name: "",
  dosage: "",
  form: "",
};

// Grouped drug search results
export const DrugGroup = {
  groupName: "",
  variants: [DrugVariant],
};

// Search response from API
export const DrugSearchResponse = {
  totalGroups: 0,
  totalVariants: 0,
  searchDurationMs: 0,
  executionTime: 0,
  fromCache: false,
  groups: [DrugGroup],
};

// Search history entry
export const SearchHistory = {
  id: "",
  queryText: "",
  normalizedQuery: "",
  resultCount: 0,
  executionTimeMs: 0,
  cacheHit: false,
  createdAt: "",
};

// Search statistics
export const SearchQueryStats = {
  normalizedQuery: "",
  searchCount: 0,
  cacheHitCount: 0,
  averageExecutionTimeMs: 0,
  lastSearchedAt: "",
};

// Analytics response from API
export const SearchAnalytics = {
  totalSearches: 0,
  cacheHits: 0,
  cacheHitRate: 0,
  averageExecutionTimeMs: 0,
  topQueries: [SearchQueryStats],
};
