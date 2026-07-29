import React, { useEffect } from 'react';
import { useAnalysis } from '../../hooks/useAnalysis';
import { Link } from 'react-router-dom';

const SkillHistory = () => {
  const { analyses, fetchAnalyses, loading } = useAnalysis();

  useEffect(() => {
    fetchAnalyses();
  }, []);

  return (
    <div className="card">
      <h2>Skill Analysis History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : analyses.length === 0 ? (
        <p>No analyses yet.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Match %</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {analyses.map(a => (
              <tr key={a._id}>
                <td>{a.jobTitle || 'Untitled'}</td>
                <td>{a.matchPercentage}%</td>
                <td>{new Date(a.createdAt).toLocaleDateString()}</td>
                <td><Link to={`/analysis/${a._id}`}>View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SkillHistory;