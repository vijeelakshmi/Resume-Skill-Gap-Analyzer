import React, { useState } from 'react';
import authService from '../../services/authService'; // default import
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      await authService.forgotPassword(email);
      setMessage('Password reset email sent. Check your inbox.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <h2>Forgot Password</h2>
      {message && <p style={{ color: 'var(--success)' }}>{message}</p>}
      {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-block" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Email'}
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        <Link to="/login">Back to Login</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;