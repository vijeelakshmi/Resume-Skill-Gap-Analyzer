import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <div className="card">
      <h2>Admin Panel</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        <nav style={{ width: '200px' }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link to="/admin/users">User Management</Link></li>
            <li><Link to="/admin/skills">Skill Database</Link></li>
            <li><Link to="/admin/reports">Reports</Link></li>
          </ul>
        </nav>
        <div style={{ flex: 1 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;