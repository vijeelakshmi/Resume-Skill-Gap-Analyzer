import React, { useState, useContext } from 'react';
import { useAnalysis } from '../../hooks/useAnalysis';
import { AnalysisContext } from '../../context/AnalysisContext';

const ManualSkillInput = () => {
  const { analyzeManual, loading } = useAnalysis();
  const { setActiveTab } = useContext(AnalysisContext);
  const [userSkills, setUserSkills] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [expLevel, setExpLevel] = useState('');

  const handleAnalyze = async () => {
    if (!userSkills || !requiredSkills) {
      alert('Please enter both your skills and required skills.');
      return;
    }
    try {
      await analyzeManual(userSkills, requiredSkills, jobTitle, expLevel);
      setActiveTab('results'); // ✅ Switch to results tab
    } catch (err) {}
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title"><i className="fas fa-edit"></i> Enter Your Skills Manually</h3>
        <div className="card-icon"><i className="fas fa-keyboard"></i></div>
      </div>
      <div className="input-group">
        <label>Your Skills (comma separated or one per line)</label>
        <textarea
          rows="6"
          value={userSkills}
          onChange={(e) => setUserSkills(e.target.value)}
          placeholder="e.g., JavaScript, React, Project Management, Data Analysis"
        ></textarea>
      </div>
      <div className="input-group">
        <label>Required Skills (comma separated or one per line)</label>
        <textarea
          rows="6"
          value={requiredSkills}
          onChange={(e) => setRequiredSkills(e.target.value)}
          placeholder="e.g., Python, Machine Learning, Agile Methodology, SQL"
        ></textarea>
      </div>
      <div className="input-group">
        <label>Desired Job Title</label>
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="e.g., Data Scientist"
        />
      </div>
      <div className="input-group">
        <label>Your Experience Level</label>
        <select value={expLevel} onChange={(e) => setExpLevel(e.target.value)}>
          <option value="">Select your experience level</option>
          <option value="entry">Entry Level (0-2 years)</option>
          <option value="mid">Mid Level (3-5 years)</option>
          <option value="senior">Senior Level (5+ years)</option>
          <option value="executive">Executive Level</option>
        </select>
      </div>
      <button className="btn btn-block" onClick={handleAnalyze} disabled={loading}>
        {loading ? <><i className="fas fa-spinner fa-pulse"></i> Analyzing...</> : <><i className="fas fa-calculator"></i> Analyze Skill Gaps</>}
      </button>
    </div>
  );
};

export default ManualSkillInput;