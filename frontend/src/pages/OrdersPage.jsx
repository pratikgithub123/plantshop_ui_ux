import React from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = ({ userProfile }) => {
  if (!userProfile) return <p>User not found</p>;

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      {/* Display some profile details if needed */}
      <Link to={`/orders/${userProfile._id}`}>View Orders</Link>
    </div>
  );
};

export default ProfilePage;