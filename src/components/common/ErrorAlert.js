/**
 * Error Alert Component
 * Displays error messages in a user-friendly format
 */

import React from 'react';
import '../../styles/Alert.css';

const ErrorAlert = ({ error, onDismiss }) => {
  if (!error) return null;

  const errorMessage = error.message || 'An error occurred';
  const errorStatus = error.status ? ` (${error.status})` : '';

  return (
    <div className="alert alert-error">
      <div className="alert-content">
        <span className="alert-icon">⚠️</span>
        <div>
          <strong>Error:</strong> {errorMessage}
          {errorStatus}
        </div>
      </div>
      {onDismiss && (
        <button className="alert-close" onClick={onDismiss}>
          ✕
        </button>
      )}
    </div>
  );
};

export default ErrorAlert;
