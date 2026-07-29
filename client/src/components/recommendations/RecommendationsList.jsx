import React, { useContext, useEffect, useState } from 'react';
import { AnalysisContext } from '../../context/AnalysisContext';
import ResourceCard from './ResourceCard';

const RecommendationsList = () => {
  const { currentAnalysis, recommendations, setRecommendations } = useContext(AnalysisContext);
  const [loading, setLoading] = useState(false);

  // Fetch directly if context doesn't have recommendations for this analysis
  const fetchDirect = async () => {
    if (!currentAnalysis?._id) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/recommendations/generate/${currentAnalysis._id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && data.recommendations) {
        setRecommendations(data.recommendations);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // If analysis exists but no recommendations in context, fetch them
  useEffect(() => {
    if (currentAnalysis?._id && (!recommendations || recommendations.length === 0)) {
      fetchDirect();
    }
  }, [currentAnalysis?._id]);

  if (!currentAnalysis) {
    return <div className="card"><p>No analysis yet. Please run one.</p></div>;
  }

  if (loading) {
    return <div className="card"><p>Loading recommendations...</p></div>;
  }

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title"><i className="fas fa-lightbulb"></i> Personalized Recommendations</h3>
        </div>
        <p>No recommendations available.</p>
        <button onClick={fetchDirect} className="btn">Refresh</button>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title"><i className="fas fa-lightbulb"></i> Personalized Recommendations</h3>
        <div className="card-icon"><i className="fas fa-tasks"></i></div>
      </div>
      <div className="recommendations">
        {recommendations.map(rec => (
          <ResourceCard key={rec._id} recommendation={rec} />
        ))}
      </div>
      <button onClick={fetchDirect} className="btn-outline" style={{ marginTop: '1rem' }}>Refresh</button>
    </div>
  );
};

export default RecommendationsList;