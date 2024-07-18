import axios from 'axios'; // Assuming you use axios for API requests
import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState(null); // State to hold user data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace with your API endpoint to fetch user data
        const response = await axios.get('https://api.example.com/user/profile'); // Replace with your actual endpoint
        console.log('User Data:', response.data);
        setUserData(response.data); // Set user data in state
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
        // Handle error (e.g., show error message)
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show loading indicator while fetching data
  }

  return (
    <div>
      <h1>Profile</h1>
      {userData ? (
        <div>
          <p>Name: {userData.name}</p>
          <p>Username: {userData.username}</p>
          <p>Location: {userData.location}</p>
          {/* Add more user details as needed */}
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default Profile;
