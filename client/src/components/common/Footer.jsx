import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <p>Advanced Resume Skill Gap Analyzer &copy; {new Date().getFullYear()}. All rights reserved.</p>
        <p>Designed to help you advance your career by identifying skill development opportunities.</p>
      </div>
    </footer>
  );
};

export default Footer;