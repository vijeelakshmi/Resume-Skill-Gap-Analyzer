import { useContext, useState } from 'react';
import { AnalysisContext } from '../context/AnalysisContext';
import analysisService from '../services/analysisService';
import recommendationService from '../services/recommendationService';
import toast from 'react-hot-toast';

export const useAnalysis = () => {
  const {
    analysisResult,
    setAnalysisResult,
    recommendations,
    setRecommendations,
  } = useContext(AnalysisContext);

  const [loading, setLoading] = useState(false);
  const [analyses, setAnalyses] = useState([]);

  const fetchAnalyses = async () => {
    setLoading(true);
    try {
      const res = await analysisService.getUserAnalyses();
      setAnalyses(res.data.analyses);
    } catch (err) {
      toast.error('Failed to load analyses');
    } finally {
      setLoading(false);
    }
  };

  const analyzeFromResume = async (resumeId, jobDescription, jobTitle, experienceLevel) => {
    setLoading(true);
    try {
      const res = await analysisService.analyzeFromResume({
        resumeId,
        jobDescription,
        jobTitle,
        experienceLevel,
      });
      setAnalysisResult(res.data.analysis);

      if (res.data.id) {
        const recRes = await recommendationService.generateRecommendations(res.data.id);
        setRecommendations(recRes.data.recommendations);
        console.log('✅ Recommendations set in context:', recRes.data.recommendations.length);
      }

      toast.success('Analysis complete');
      await fetchAnalyses();
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Analysis failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const analyzeManual = async (userSkills, requiredSkills, jobTitle, experienceLevel) => {
    // similar implementation
  };

  const getAnalysis = async (id) => {
    // ...
  };

  return {
    analyses,
    currentAnalysis: analysisResult,
    recommendations,   // ✅ from context
    loading,
    fetchAnalyses,
    analyzeFromResume,
    analyzeManual,
    getAnalysis,
  };
};