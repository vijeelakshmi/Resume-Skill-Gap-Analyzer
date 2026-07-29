import React from 'react';

const ResourceCard = ({ recommendation }) => {
  if (!recommendation) return null;

  return (
    <div className="recommendation-item">
      <div className="recommendation-icon">
        <i className="fas fa-book"></i>
      </div>
      <div className="recommendation-content">
        <h4>{recommendation.title || `Learn ${recommendation.skill || 'this skill'}`}</h4>
        <p>{recommendation.description || `Develop proficiency in ${recommendation.skill}.`}</p>
        <div className="resource-tags">
          {recommendation.resources && recommendation.resources.length > 0 ? (
            recommendation.resources.map((res, idx) => (
              <a
                key={idx}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-tag"
              >
                {res.name}
              </a>
            ))
          ) : (
            <span className="resource-tag">No resources available</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;