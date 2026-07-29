import React, { useEffect, useState } from 'react';
import { useAnalysis } from '../../hooks/useAnalysis';
import Timeline from './Timeline';

const RoadMap = () => {
  const { currentAnalysis } = useAnalysis();
  const [roadmapSteps, setRoadmapSteps] = useState([]);

  useEffect(() => {
    if (currentAnalysis && currentAnalysis.gapSkills && currentAnalysis.gapSkills.length > 0) {
      // Build a dynamic roadmap based on missing skills
      const steps = currentAnalysis.gapSkills.slice(0, 5).map((skill, idx) => ({
        icon: idx === 0 ? 'book' : idx === 1 ? 'chart-line' : idx === 2 ? 'robot' : 'cloud',
        title: `Learn ${skill}`,
        description: `Master ${skill} through courses, projects, and practice.`,
        duration: `${Math.floor(Math.random() * 4) + 2} weeks`,
      }));
      setRoadmapSteps(steps);
    } else {
      // Default roadmap
      setRoadmapSteps([
        { icon: 'book', title: 'Foundation', description: 'Build core skills.', duration: '4 weeks' },
        { icon: 'chart-line', title: 'Advanced', description: 'Deepen knowledge.', duration: '6 weeks' },
        { icon: 'award', title: 'Certification', description: 'Get certified.', duration: '2 weeks' },
      ]);
    }
  }, [currentAnalysis]);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title"><i className="fas fa-map-marked-alt"></i> Your Learning Roadmap</h3>
        <div className="card-icon"><i className="fas fa-road"></i></div>
      </div>
      <Timeline steps={roadmapSteps} />
      <button className="btn btn-success" style={{ marginTop: '1rem' }}>
        Download Roadmap
      </button>
    </div>
  );
};

export default RoadMap;