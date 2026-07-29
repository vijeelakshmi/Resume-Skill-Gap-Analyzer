import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <i className="fas fa-chart-line"></i>
            <div>
              <h1>Advanced Skill Gap Analyzer</h1>
              <p>Identify and bridge your career skill gaps</p>
            </div>
          </div>
          <nav className="nav-links">
            <Link to="/" className="nav-link"><i className="fas fa-home"></i> Home</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="nav-link"><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
                <Link to="/profile" className="nav-link"><i className="fas fa-user"></i> Profile</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="nav-link"><i className="fas fa-cog"></i> Admin</Link>
                )}
                <button onClick={handleLogout} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link"><i className="fas fa-sign-in-alt"></i> Login</Link>
                <Link to="/register" className="nav-link"><i className="fas fa-user-plus"></i> Register</Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;