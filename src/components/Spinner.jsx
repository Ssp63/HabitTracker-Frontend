// src/components/Spinner.jsx

import React from 'react';

// UPDATED: The component now accepts a 'size' prop.
function Spinner({ size = 'default' }) {
  // We construct the className dynamically based on the prop.
  const spinnerClassName = size === 'small' ? 'spinner spinner--small' : 'spinner';
  
  return <div className={spinnerClassName}></div>;
}

export default Spinner;