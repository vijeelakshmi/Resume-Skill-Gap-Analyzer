import api from './api';

const recommendationService = {
  generateRecommendations: (analysisId) => api.post(`/recommendations/generate/${analysisId}`),
  getUserRecommendations: () => api.get('/recommendations'),
};

export default recommendationService;