import React from 'react';

const SkillBreakdown = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  return (
    <>
      <h3 style={{ margin: '30px 0 20px', color: 'var(--primary-dark)' }}>Skill Breakdown</h3>
      <div className="skills-container">
        {skills.map((skill, idx) => (
          <div key={idx} className={`skill-item skill-${skill.status}`}>
            <div className="skill-name">
              <span>{skill.name}</span>
              <span className="skill-category">{skill.category}</span>
            </div>
            <div className="skill-level">
              <div className="skill-progress" style={{ width: `${skill.proficiency}%` }}></div>
            </div>
            <div className="skill-status">
              {skill.status === 'strong' ? 'Strong Match' : skill.status === 'good' ? 'Good Match' : 'Missing Skill'}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SkillBreakdown;