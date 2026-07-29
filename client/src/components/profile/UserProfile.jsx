import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <div className="card">
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Role:</strong> {user?.role}</p>
      <p><strong>Member since:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default UserProfile;