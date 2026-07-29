import React from 'react';

const Timeline = ({ steps }) => {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="timeline">
      {steps.map((step, idx) => (
        <div key={idx} className="timeline-item">
          <div className="timeline-icon">
            <i className={`fas fa-${step.icon}`}></i>
          </div>
          <div className="timeline-content">
            <h4>{step.title}</h4>
            <p>{step.description}</p>
            <div className="timeline-date">{step.duration}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;