/**
 * Search Page Component
 * Main search interface for drugs
 * Best Practice: Separation of concerns, proper state management, error handling
 */

import React, { useState, useCallback } from 'react';
import { useDrugSearch, useSemanticSearch } from '../../hooks';
import { Spinner, ErrorAlert, SuccessMessage } from '../../components/common';
import '../../styles/SearchPage.css';

const MAX_TEXT_PREVIEW_LENGTH = 220;

const CHUNK_TYPE_LABELS = {
  Purpose: 'Purpose',
  Warnings: 'Warnings',
  DoNotUse: 'Do Not Use',
  AskDoctor: 'Ask a Doctor',
  AskDoctorOrPharmacist: 'Ask a Doctor or Pharmacist',
  PregnancyOrBreastFeeding: 'Pregnancy / Breastfeeding',
  DosageAndAdministration: 'Dosage & Administration',
  ActiveIngredient: 'Active Ingredient',
};


const getDisplayValue = (value) => {
  if (typeof value !== 'string') {
    return 'Not specified';
  }

  const trimmedValue = value.trim();
  return trimmedValue.length > 0 ? trimmedValue : 'Not specified';
};

const getPreviewText = (value) => {
  const normalizedValue = getDisplayValue(value);

  if (normalizedValue === 'Not specified') {
    return normalizedValue;
  }

  if (normalizedValue.length <= MAX_TEXT_PREVIEW_LENGTH) {
    return normalizedValue;
  }

  return `${normalizedValue.slice(0, MAX_TEXT_PREVIEW_LENGTH)}...`;
};

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [mode, setMode] = useState('keyword'); // 'keyword' | 'smart'
  const keywordSearch = useDrugSearch();
  const smartSearch = useSemanticSearch();

  const { data, loading, error, reset } =
    mode === 'smart' ? smartSearch : keywordSearch;

  /**
   * Handle search form submission
   */
  const handleSearch = useCallback(
    async (e) => {
      e.preventDefault();
      setSuccessMsg('');

      if (!query.trim()) {
        return;
      }

      if (mode === 'smart') {
        const result = await smartSearch.search(query);
        if (result?.results?.length > 0) {
          setSuccessMsg(`Found ${result.results.length} relevant drug(s) for "${query}"`);
        }
        return;
      }

      const result = await keywordSearch.search(query);
      if (result?.totalVariants > 0) {
        setSuccessMsg(`Found results for "${query}"`);
      }
    },
    [query, mode, keywordSearch, smartSearch]
  );

  /**
   * Switch between keyword and smart (AI) search modes
   */
  const handleModeChange = useCallback(
    (newMode) => {
      if (newMode === mode) return;
      setMode(newMode);
      setSuccessMsg('');
      keywordSearch.reset();
      smartSearch.reset();
    },
    [mode, keywordSearch, smartSearch]
  );

  /**
   * Handle input change
   */
  const handleInputChange = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  /**
   * Clear search results
   */
  const handleClear = useCallback(() => {
    setQuery('');
    reset();
    setSuccessMsg('');
  }, [reset]);

  return (
    <div className="search-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1>Search Drugs</h1>
          <p className="subtitle">
            Find information about medications and drugs
          </p>
        </div>

        {/* Search Mode Toggle */}
        <div className="search-mode-toggle" role="tablist" aria-label="Search mode">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'keyword'}
            className={`mode-btn ${mode === 'keyword' ? 'mode-btn-active' : ''}`}
            onClick={() => handleModeChange('keyword')}
            disabled={loading}
          >
            🔤 Keyword Search
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'smart'}
            className={`mode-btn ${mode === 'smart' ? 'mode-btn-active' : ''}`}
            onClick={() => handleModeChange('smart')}
            disabled={loading}
          >
            🤖 Smart Search (AI)
          </button>
        </div>
        <p className="mode-help">
          {mode === 'keyword'
            ? 'Matches the exact drug or brand name, e.g. "ibuprofen".'
            : 'Understands meaning, not just words — try describing a symptom, e.g. "medicine for stomach bleeding risk".'}
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-group">
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder={
                mode === 'keyword'
                  ? 'Enter drug name or keyword (min 2 characters)'
                  : 'Describe what you need, e.g. "pain reliever safe with heart problems"'
              }
              className="search-input"
              disabled={loading}
              minLength="2"
              maxLength="256"
            />
            <div className="form-buttons">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading || query.trim().length < 2}
              >
                {loading ? 'Searching...' : mode === 'smart' ? 'Ask AI to Search' : 'Search'}
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

        {/* Messages */}
        {error && (
          <ErrorAlert
            error={error}
            onDismiss={() => reset()}
          />
        )}
        {successMsg && (
          <SuccessMessage
            message={successMsg}
            onDismiss={() => setSuccessMsg('')}
          />
        )}

        {/* Loading State */}
        {loading && (
          <Spinner
            message={
              mode === 'smart'
                ? 'Reading drug label data with AI, this can take a few seconds...'
                : 'Searching drugs...'
            }
          />
        )}

        {/* Smart (AI) Search Results */}
        {mode === 'smart' && data && !loading && (
          <div className="results-section">
            <div className="results-header">
              <h2>Smart Search Results</h2>
              <span className="results-meta">
                {data.results.length} drug{data.results.length === 1 ? '' : 's'} found
              </span>
            </div>

            {data.results.length > 0 ? (
              <div className="results-list">
                {data.results.map((result, index) => (
                  <div key={index} className="result-group semantic-result-card">
                    <div className="group-header">
                      <h3 className="group-name">{result.brandName}</h3>
                      <span
                        className="score-badge"
                        title="How closely this matches your question (AI similarity score)"
                      >
                        {Math.round(result.score * 100)}% match
                      </span>
                    </div>
                    <div className="variant-detail-row">
                      <span className="variant-detail-label">Generic Name</span>
                      <span className="variant-detail-value">{result.genericName || 'Not specified'}</span>
                    </div>
                    <div className="variant-detail-block variant-detail-block-full">
                      <p className="variant-detail-block-label">
                        {CHUNK_TYPE_LABELS[result.chunkType] || result.chunkType}
                      </p>
                      <p className="variant-detail-block-value">{result.matchedText}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>No AI matches found for "{query}". Try a keyword search instead, or rephrase your question.</p>
              </div>
            )}
          </div>
        )}

        {/* Keyword Search Results */}
        {mode === 'keyword' && data && !loading && (
          <div className="results-section">
            <div className="results-header">
              <h2>Search Results</h2>
              <span className="results-meta">
                {data.totalGroups} groups • {data.totalVariants} variants
                {data.fromCache && ' • From Cache'}
              </span>
            </div>

            {data.groups && data.groups.length > 0 ? (
              <div className="results-list">
                {data.groups.map((group, groupIndex) => (
                  <div key={groupIndex} className="result-group">
                    <div className="group-header">
                      <h3 className="group-name">{group.groupName}</h3>
                      <span className="group-meta">
                        {group.variants.length} variant{group.variants.length === 1 ? '' : 's'}
                      </span>
                    </div>
                    <div className="variants-list">
                      {group.variants.map((variant, variantIndex) => (
                        <div key={variantIndex} className="variant-card">
                          <div className="variant-info">
                            <p className="variant-name">{getDisplayValue(variant.name)}</p>
                            <div className="variant-details">
                              <div className="variant-detail-row">
                                <span className="variant-detail-label">Dosage</span>
                                <span
                                  className={`variant-detail-value ${
                                    getDisplayValue(variant.strength) === 'Not specified'
                                      ? 'variant-detail-value-empty'
                                      : ''
                                  }`}
                                >
                                  {getDisplayValue(variant.strength)}
                                </span>
                              </div>
                              <div className="variant-detail-row">
                                <span className="variant-detail-label">Form</span>
                                <span
                                  className={`variant-detail-value ${
                                    getDisplayValue(variant.dosageForm) === 'Not specified'
                                      ? 'variant-detail-value-empty'
                                      : ''
                                  }`}
                                >
                                  {getDisplayValue(variant.dosageForm)}
                                </span>
                              </div>
                              <div className="variant-detail-row">
                                <span className="variant-detail-label">Route</span>
                                <span
                                  className={`variant-detail-value ${
                                    getDisplayValue(variant.route) === 'Not specified'
                                      ? 'variant-detail-value-empty'
                                      : ''
                                  }`}
                                >
                                  {getDisplayValue(variant.route)}
                                </span>
                              </div>
                              <div className="variant-detail-row">
                                <span className="variant-detail-label">Manufacturer</span>
                                <span
                                  className={`variant-detail-value ${
                                    getDisplayValue(variant.manufacturer) === 'Not specified'
                                      ? 'variant-detail-value-empty'
                                      : ''
                                  }`}
                                >
                                  {getDisplayValue(variant.manufacturer)}
                                </span>
                              </div>
                            </div>

                            <div className="variant-detail-grid">
                              <div className="variant-detail-block">
                                <p className="variant-detail-block-label">Active Ingredient</p>
                                <p className="variant-detail-block-value" title={getDisplayValue(variant.activeIngredient)}>
                                  {getPreviewText(variant.activeIngredient)}
                                </p>
                              </div>
                              <div className="variant-detail-block">
                                <p className="variant-detail-block-label">Purpose</p>
                                <p className="variant-detail-block-value" title={getDisplayValue(variant.purpose)}>
                                  {getPreviewText(variant.purpose)}
                                </p>
                              </div>
                              <div className="variant-detail-block variant-detail-block-full">
                                <p className="variant-detail-block-label">Warnings</p>
                                <p className="variant-detail-block-value" title={getDisplayValue(variant.warnings)}>
                                  {getPreviewText(variant.warnings)}
                                </p>
                              </div>
                              <div className="variant-detail-block">
                                <p className="variant-detail-block-label">Dosage and Administration</p>
                                <p className="variant-detail-block-value" title={getDisplayValue(variant.dosageAndAdministration)}>
                                  {getPreviewText(variant.dosageAndAdministration)}
                                </p>
                              </div>
                              <div className="variant-detail-block">
                                <p className="variant-detail-block-label">Do Not Use</p>
                                <p className="variant-detail-block-value" title={getDisplayValue(variant.doNotUse)}>
                                  {getPreviewText(variant.doNotUse)}
                                </p>
                              </div>
                              <div className="variant-detail-block">
                                <p className="variant-detail-block-label">Product Type</p>
                                <p className="variant-detail-block-value" title={getDisplayValue(variant.productType)}>
                                  {getPreviewText(variant.productType)}
                                </p>
                              </div>
                              <div className="variant-detail-block">
                                <p className="variant-detail-block-label">Application Number</p>
                                <p className="variant-detail-block-value" title={getDisplayValue(variant.applicationNumber)}>
                                  {getPreviewText(variant.applicationNumber)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>No results found for "{query}"</p>
              </div>
            )}

            {/* Performance Info */}
            <div className="performance-info">
              <small>
                Execution time: {data.executionTime}ms
              </small>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!data && !loading && !error && (
          <div className="empty-state">
            <p>
              👆{' '}
              {mode === 'smart'
                ? 'Describe a symptom or need above and let AI find relevant medications'
                : 'Start by entering a drug name above'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
