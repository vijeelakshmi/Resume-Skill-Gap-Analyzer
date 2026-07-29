import React from 'react';

const ResumeParser = ({ text, skills }) => {
  return (
    <div className="card">
      <h4>Extracted Resume Content</h4>
      <p><strong>Skills Found:</strong> {skills.join(', ')}</p>
      <details>
        <summary>View raw text</summary>
        <pre style={{ maxHeight: '200px', overflow: 'auto', background: '#f5f5f5', padding: '10px' }}>
          {text}
        </pre>
      </details>
    </div>
  );
};

export default ResumeParser;