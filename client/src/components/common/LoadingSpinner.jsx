import React from 'react';

const LoadingSpinner = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
      <i className="fas fa-spinner fa-pulse fa-3x" style={{ color: 'var(--primary)' }}></i>
    </div>
  );
};

export default LoadingSpinner;