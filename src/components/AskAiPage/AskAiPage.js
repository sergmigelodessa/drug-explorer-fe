/**
 * Ask AI Page Component
 * RAG-based Q&A: ask a free-text question, get an answer grounded in ingested drug label data
 */

import React, { useState, useCallback } from 'react';
import { useAskAi } from '../../hooks';
import { Spinner, ErrorAlert } from '../../components/common';
import '../../styles/AskAiPage.css';

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

const EXAMPLE_QUESTIONS = [
  'Can I take naproxen if I have stomach problems?',
  'What are the risks of taking ibuprofen with alcohol?',
  'Is it safe to take a pain reliever while pregnant?',
];

const AskAiPage = () => {
  const [question, setQuestion] = useState('');
  const { answer, loading, error, ask, reset } = useAskAi();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (question.trim().length < 3) {
        return;
      }
      await ask(question.trim());
    },
    [question, ask]
  );

  const handleExampleClick = useCallback((example) => {
    setQuestion(example);
  }, []);

  const handleClear = useCallback(() => {
    setQuestion('');
    reset();
  }, [reset]);

  return (
    <div className="ask-ai-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1>🤖 Ask AI About Medications</h1>
          <p className="subtitle">
            Ask a question in plain English. The AI searches ingested drug label
            data and answers using only that information, with sources cited.
          </p>
        </div>

        {/* Disclaimer - always visible */}
        <div className="alert alert-warning ask-ai-disclaimer">
          <div className="alert-content">
            <span className="alert-icon">⚠️</span>
            <div>
              <strong>Not medical advice.</strong> This is an AI demo for learning purposes.
              Always consult a doctor or pharmacist for real medical decisions.
            </div>
          </div>
        </div>

        {/* Question Form */}
        <form onSubmit={handleSubmit} className="ask-ai-form">
          <label htmlFor="question-input" className="ask-ai-label">
            Your question
          </label>
          <textarea
            id="question-input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder='e.g. "Can I take ibuprofen while breastfeeding?"'
            className="ask-ai-input"
            rows={3}
            maxLength={512}
            disabled={loading}
          />
          <div className="ask-ai-hint">
            {question.length}/512 characters &middot; minimum 3 characters
          </div>

          <div className="ask-ai-examples">
            <span className="ask-ai-examples-label">Try an example:</span>
            {EXAMPLE_QUESTIONS.map((example) => (
              <button
                key={example}
                type="button"
                className="example-chip"
                onClick={() => handleExampleClick(example)}
                disabled={loading}
              >
                {example}
              </button>
            ))}
          </div>

          <div className="form-buttons">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || question.trim().length < 3}
            >
              {loading ? 'Thinking...' : 'Ask AI'}
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
        </form>

        {/* Error */}
        {error && <ErrorAlert error={error} onDismiss={() => reset()} />}

        {/* Loading */}
        {loading && (
          <Spinner message="Searching the drug knowledge base and generating an answer, this can take up to a minute on first use..." />
        )}

        {/* Answer */}
        {answer && !loading && (
          <div className="answer-section">
            {!answer.grounded ? (
              <div className="alert alert-info">
                <div className="alert-content">
                  <span className="alert-icon">ℹ️</span>
                  <div>{answer.answer}</div>
                </div>
              </div>
            ) : (
              <>
                <div className="answer-card">
                  <h2 className="answer-title">Answer</h2>
                  <p className="answer-text">{answer.answer}</p>
                </div>

                {answer.sources && answer.sources.length > 0 && (
                  <div className="sources-section">
                    <h3 className="sources-title">
                      Sources ({answer.sources.length})
                    </h3>
                    <p className="sources-help">
                      These are the exact drug label excerpts the AI used to answer your question.
                    </p>
                    <div className="sources-list">
                      {answer.sources.map((source, index) => (
                        <details key={index} className="source-item" open={index === 0}>
                          <summary className="source-summary">
                            <span className="source-index">[{index + 1}]</span>
                            <span className="source-brand">{source.brandName}</span>
                            <span className="source-chunk-type">
                              {CHUNK_TYPE_LABELS[source.chunkType] || source.chunkType}
                            </span>
                            <span className="source-similarity">
                              {Math.round(source.similarity * 100)}% match
                            </span>
                          </summary>
                          <p className="source-text">{source.chunkText}</p>
                        </details>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Empty State */}
        {!answer && !loading && !error && (
          <div className="empty-state">
            <p>💬 Ask a question above to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AskAiPage;
