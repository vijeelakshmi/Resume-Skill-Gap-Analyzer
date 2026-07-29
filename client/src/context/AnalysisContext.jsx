import React, { createContext, useState } from 'react';

export const AnalysisContext = createContext();

export const AnalysisProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('upload');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  return (
    <AnalysisContext.Provider
      value={{
        activeTab,
        setActiveTab,
        analysisResult,
        setAnalysisResult,
        recommendations,
        setRecommendations,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};