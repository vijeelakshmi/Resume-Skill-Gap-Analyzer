import React from 'react';
import { useAnalysis } from '../../hooks/useAnalysis';
import ResultsDisplay from './ResultsDisplay';

const SkillGapAnalyzer = ({ userSkills, requiredSkills, jobTitle, experienceLevel }) => {
  const { analyzeManual, currentAnalysis, loading } = useAnalysis();

  React.useEffect(() => {
    if (userSkills && requiredSkills) {
      analyzeManual(userSkills, requiredSkills, jobTitle, experienceLevel);
    }
  }, [userSkills, requiredSkills, jobTitle, experienceLevel]);

  if (loading) return <p>Analyzing...</p>;
  if (!currentAnalysis) return <p>No analysis yet.</p>;
  return <ResultsDisplay analysis={currentAnalysis} />;
};

export default SkillGapAnalyzer;