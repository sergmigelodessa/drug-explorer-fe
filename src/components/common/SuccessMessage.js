/**
 * Success Message Component
 * Displays success feedback to user
 */

import React from 'react';
import '../../styles/Alert.css';

const SuccessMessage = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div className="alert alert-success">
      <div className="alert-content">
        <span className="alert-icon">✓</span>
        <div>{message}</div>
      </div>
      {onDismiss && (
        <button className="alert-close" onClick={onDismiss}>
          ✕
        </button>
      )}
    </div>
  );
};

export default SuccessMessage;
