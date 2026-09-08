/**
 * Loading Spinner Component
 * Reusable component for displaying loading state
 */

import React from 'react';
import '../../styles/Spinner.css';

const Spinner = ({ message = 'Loading...' }) => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
};

export default Spinner;
