import api from './api';

const analysisService = {
  analyzeFromResume: (data) => api.post('/analysis/from-resume', data),
  analyzeManual: (data) => api.post('/analysis/manual', data),
  getUserAnalyses: () => api.get('/analysis'),
  getAnalysisById: (id) => api.get(`/analysis/${id}`)
};

export default analysisService;