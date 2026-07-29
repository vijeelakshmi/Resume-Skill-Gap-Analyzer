import React from 'react';
import Timeline from './Timeline';

const LearningPath = () => {
  // This could be generated dynamically from the analysis gaps.
  const steps = [
    { icon: 'book', title: 'Foundation (Weeks 1‑4)', description: 'Learn core concepts and programming fundamentals.', duration: '4 weeks' },
    { icon: 'chart-line', title: 'Intermediate Skills (Weeks 5‑8)', description: 'Build projects and deepen your knowledge.', duration: '4 weeks' },
    { icon: 'robot', title: 'Advanced Topics (Weeks 9‑14)', description: 'Master advanced frameworks and tools.', duration: '6 weeks' },
    { icon: 'cloud', title: 'Real‑World Practice (Weeks 15‑18)', description: 'Contribute to open source or build a portfolio.', duration: '4 weeks' },
    { icon: 'award', title: 'Certification & Job Prep (Weeks 19‑20)', description: 'Get certified and prepare for interviews.', duration: '2 weeks' },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title"><i className="fas fa-map-marked-alt"></i> Personalized Learning Roadmap</h3>
        <div className="card-icon"><i className="fas fa-road"></i></div>
      </div>
      <Timeline steps={steps} />
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button className="btn btn-success">
          <i className="fas fa-download"></i> Download Roadmap
        </button>
      </div>
    </div>
  );
};

export default LearningPath;