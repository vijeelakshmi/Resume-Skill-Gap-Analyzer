import React, { useState } from 'react';
import Tabs from '../common/Tabs';
import UploadTab from '../resume/UploadTab';
import ManualTab from '../resume/ManualTab';
import ResultsTab from '../analysis/ResultsTab';
import RecommendationsTab from '../recommendations/RecommendationsTab';
import RoadmapTab from '../recommendations/RoadmapTab';
import SkillChart from './SkillChart';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('upload');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'upload': return <UploadTab />;
      case 'manual': return <ManualTab />;
      case 'results': return <ResultsTab />;
      case 'recommendations': return <RecommendationsTab />;
      case 'roadmap': return <RoadmapTab />;
      default: return null;
    }
  };

  return (
    <>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="dashboard">
        <div className="left-column">
          {renderTabContent()}
        </div>
        <div className="right-column">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title"><i className="fas fa-chart-line"></i> Skill Match Visualization</h3>
              <div className="card-icon"><i className="fas fa-chart-pie"></i></div>
            </div>
            <div className="comparison-chart">
              <SkillChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;