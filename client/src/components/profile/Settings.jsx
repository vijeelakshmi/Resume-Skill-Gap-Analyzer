import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

const Settings = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);

  const handleNotificationChange = () => {
    setNotifications(!notifications);
    // In a real app, you'd save to backend/localStorage
  };

  return (
    <div className="card">
      <h2>Settings</h2>
      <div className="input-group">
        <label>
          <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} /> Dark Mode
        </label>
      </div>
      <div className="input-group">
        <label>
          <input type="checkbox" checked={notifications} onChange={handleNotificationChange} /> Enable Email Notifications
        </label>
      </div>
      <p>Email: {user?.email}</p>
      <button className="btn">Save Settings</button>
    </div>
  );
};

export default Settings;