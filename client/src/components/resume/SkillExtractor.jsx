import React from 'react';

const SkillExtractor = ({ skills }) => {
  return (
    <div className="skill-tags">
      {skills.map((skill, idx) => (
        <span key={idx} className="resource-tag">{skill}</span>
      ))}
    </div>
  );
};

export default SkillExtractor;