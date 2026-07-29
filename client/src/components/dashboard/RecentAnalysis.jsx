import React, { useEffect } from 'react';
import { useAnalysis } from '../../hooks/useAnalysis';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';

const RecentAnalyses = () => {
  const { analyses, fetchAnalyses, loading } = useAnalysis();

  useEffect(() => {
    fetchAnalyses();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title"><i className="fas fa-history"></i> Recent Analyses</h3>
      </div>
      {analyses.length === 0 ? (
        <p>No analyses yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {analyses.slice(0, 5).map(a => (
            <li key={a._id} style={{ marginBottom: '10px', borderBottom: '1px solid var(--light-gray)', paddingBottom: '10px' }}>
              <Link to={`/analysis/${a._id}`} style={{ textDecoration: 'none', color: 'var(--primary)' }}>
                <strong>{a.jobTitle || 'Untitled'}</strong> - {a.matchPercentage}% match
              </Link>
              <div style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>{new Date(a.createdAt).toLocaleDateString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentAnalyses;