import React from 'react';

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'upload', icon: 'cloud-upload-alt', label: 'Upload Resume' },
    { id: 'manual', icon: 'edit', label: 'Manual Input' },
    { id: 'results', icon: 'chart-bar', label: 'Analysis Results' },
    { id: 'recommendations', icon: 'lightbulb', label: 'Recommendations' },
    { id: 'roadmap', icon: 'map-marked-alt', label: 'Learning Roadmap' }
  ];

  return (
    <div className="tabs">
      {tabs.map(tab => (
        <div
          key={tab.id}
          className={`tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          <i className={`fas fa-${tab.icon}`}></i> {tab.label}
        </div>
      ))}
    </div>
  );
};

export default Tabs;