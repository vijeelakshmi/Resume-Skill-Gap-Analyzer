import React, { useState, useContext } from 'react';
import { useResume } from '../../hooks/useResume';
import { useAnalysis } from '../../hooks/useAnalysis';
import { AnalysisContext } from '../../context/AnalysisContext';

const UploadTab = () => {
  const { uploadResume, resumes, loading: resumeLoading } = useResume();
  const { analyzeFromResume, loading: analysisLoading } = useAnalysis();
  const { setActiveTab } = useContext(AnalysisContext);

  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [expLevel, setExpLevel] = useState('');
  const [selectedResumeId, setSelectedResumeId] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUploadAndAnalyze = async () => {
    if (!file && !selectedResumeId) {
      alert('Please select a resume file or choose a previously uploaded one.');
      return;
    }
    if (!jobDesc) {
      alert('Please paste a job description.');
      return;
    }

    try {
      let resumeId = selectedResumeId;
      if (file) {
        const uploaded = await uploadResume(file);
        resumeId = uploaded.id;
      }
      await analyzeFromResume(resumeId, jobDesc, jobTitle, expLevel);
      setActiveTab('results'); // ✅ Switch to results tab after analysis
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title"><i className="fas fa-file-upload"></i> Upload Your Resume</h3>
        <div className="card-icon"><i className="fas fa-file-alt"></i></div>
      </div>
      <div className="input-group">
        <label>Select Resume File</label>
        <div
          className="file-upload-area"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => document.getElementById('resume-input').click()}
        >
          <i className={`fas ${file ? 'fa-check-circle' : 'fa-cloud-upload-alt'}`}></i>
          <p>{file ? file.name : 'Drag & drop your resume here or click to browse'}</p>
          <p className="small">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
        </div>
        <input
          type="file"
          id="resume-input"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          hidden
        />
      </div>

      {resumes.length > 0 && (
        <div className="input-group">
          <label>Or select a previously uploaded resume</label>
          <select value={selectedResumeId} onChange={(e) => setSelectedResumeId(e.target.value)}>
            <option value="">-- Select a resume --</option>
            {resumes.map(r => (
              <option key={r._id} value={r._id}>{r.originalName}</option>
            ))}
          </select>
        </div>
      )}

      <div className="input-group">
        <label>Paste Job Description</label>
        <textarea
          rows="6"
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          placeholder="Paste the job description you're targeting here..."
        ></textarea>
      </div>
      <div className="input-group">
        <label>Desired Job Title</label>
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="e.g., Senior Frontend Developer"
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
      <button
        className="btn btn-block"
        onClick={handleUploadAndAnalyze}
        disabled={resumeLoading || analysisLoading}
      >
        {(resumeLoading || analysisLoading) ? (
          <><i className="fas fa-spinner fa-pulse"></i> Processing...</>
        ) : (
          <><i className="fas fa-search"></i> Analyze Skill Gaps</>
        )}
      </button>
    </div>
  );
};

export default UploadTab;