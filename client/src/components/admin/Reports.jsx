import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const Reports = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get('/admin/stats');
      setStats(res.data.stats);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Reports</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Total Users: {stats?.totalUsers}</p>
          <p>Total Analyses: {stats?.totalAnalyses}</p>
          <h4>Recent Analyses</h4>
          <ul>
            {stats?.recentAnalyses?.map(a => (
              <li key={a._id}>{a.user?.name} - {a.jobTitle} - {a.matchPercentage}%</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Reports;