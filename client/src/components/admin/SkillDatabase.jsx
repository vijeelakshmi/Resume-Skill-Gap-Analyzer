import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const SkillDatabase = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await api.get('/skills'); // public endpoint
      setSkills(res.data.skills);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Skill Database</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="skill-tags">
          {skills.map((skill, idx) => (
            <span key={idx} className="resource-tag">{skill}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillDatabase;