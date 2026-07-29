import React from 'react';

const FeatureHighlights = () => {
  return (
    <div className="feature-highlights">
      <div className="feature-card">
        <div className="feature-icon"><i className="fas fa-file-upload"></i></div>
        <h3>Easy Resume Upload</h3>
        <p>Upload your resume in multiple formats and let our AI extract your skills automatically.</p>
      </div>
      <div className="feature-card">
        <div className="feature-icon"><i className="fas fa-chart-pie"></i></div>
        <h3>Detailed Analysis</h3>
        <p>Get a comprehensive breakdown of your skills matched against job requirements.</p>
      </div>
      <div className="feature-card">
        <div className="feature-icon"><i className="fas fa-road"></i></div>
        <h3>Personalized Roadmap</h3>
        <p>Receive a customized learning path to bridge your skill gaps effectively.</p>
      </div>
    </div>
  );
};

export default FeatureHighlights;