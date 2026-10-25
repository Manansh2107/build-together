import React from 'react';
import './ProgressBar.css';

export const ProgressBar = ({ progress = 0, showLabel = true, size = 'md' }) => {
  const cleanProgress = Math.min(100, Math.max(0, Number(progress) || 0));

  return (
    <div className={`progress-bar-container progress-${size}`}>
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${cleanProgress}%` }}
        />
      </div>
      {showLabel && <span className="progress-bar-label">{cleanProgress}%</span>}
    </div>
  );
};
