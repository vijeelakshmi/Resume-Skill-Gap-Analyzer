import { useState } from 'react';
import resumeService from '../services/resumeService';
import toast from 'react-hot-toast';

export const useResume = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResumes = async () => {
    setLoading(true);
    try {
      const res = await resumeService.getUserResumes();
      setResumes(res.data.resumes);
    } catch (err) {
      toast.error('Failed to load resumes');
    } finally {
      setLoading(false);
    }
  };

  const uploadResume = async (file) => {
    setLoading(true);
    try {
      const res = await resumeService.uploadResume(file);
      toast.success('Resume uploaded successfully');
      await fetchResumes(); // refresh list
      return res.data.resume;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteResume = async (id) => {
    try {
      await resumeService.deleteResume(id);
      toast.success('Resume deleted');
      await fetchResumes();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return { resumes, loading, fetchResumes, uploadResume, deleteResume };
};