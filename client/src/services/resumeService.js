import api from './api';

const resumeService = {
  uploadResume: (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    return api.post('/resumes/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  getUserResumes: () => api.get('/resumes'),
  deleteResume: (id) => api.delete(`/resumes/${id}`)
};

export default resumeService;