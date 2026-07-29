import React from 'react';
import { useAnalysis } from '../../hooks/useAnalysis';
import SkillBreakdown from './SkillBreakdown';

const ResultsDisplay = () => {
  const { currentAnalysis } = useAnalysis();

  if (!currentAnalysis) {
    return (
      <div className="card">
        <p>No analysis results yet. Please upload a resume or enter skills manually.</p>
      </div>
    );
  }

  const { matchPercentage, userCount, requiredCount, matchedCount, gapCount, categorized } = currentAnalysis;

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title"><i className="fas fa-chart-bar"></i> Skill Gap Analysis Results</h3>
        <div className="card-icon"><i className="fas fa-chart-pie"></i></div>
      </div>

      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${matchPercentage}%` }}></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
          <span>Skill Match: {matchPercentage}%</span>
          <span>Gap: {100 - matchPercentage}%</span>
        </div>
      </div>

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

      <SkillBreakdown skills={categorized} />
    </div>
  );
};

export default ResultsDisplay;