import React from 'react';
import { useAnalysis } from '../../hooks/useAnalysis';

const StatsCards = () => {
  const { currentAnalysis } = useAnalysis();

  // ✅ Early return if no analysis data
  if (!currentAnalysis) return null;

  // Safely extract values with fallbacks
  const userCount = currentAnalysis.userCount ?? 0;
  const requiredCount = currentAnalysis.requiredCount ?? 0;
  const matchedCount = currentAnalysis.matchedCount ?? 0;
  const gapCount = currentAnalysis.gapCount ?? 0;

  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4361ee, #4cc9f0)' }}>
          <i className="fas fa-star"></i>
        </div>
        <div className="stat-value">{userCount}</div>
        <div className="stat-label">Your Skills</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #7209b7, #b5179e)' }}>
          <i className="fas fa-bullseye"></i>
        </div>
        <div className="stat-value">{requiredCount}</div>
        <div className="stat-label">Required Skills</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4bb543, #6bcf7f)' }}>
          <i className="fas fa-check-circle"></i>
        </div>
        <div className="stat-value">{matchedCount}</div>
        <div className="stat-label">Matched Skills</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #dc3545, #ff6b6b)' }}>
          <i className="fas fa-exclamation-circle"></i>
        </div>
        <div className="stat-value">{gapCount}</div>
        <div className="stat-label">Skill Gaps</div>
      </div>
    </div>
  );
};

export default StatsCards;