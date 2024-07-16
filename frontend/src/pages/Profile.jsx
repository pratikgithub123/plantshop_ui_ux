import React from 'react';

const Profile = () => {
  const name = "Pratik Dangi";
  const username = "dangipratik19@gmail.com";
  const location = "kathmandu";

  return (
    <div>
      
      <p>
        Name: {name}<br />
        Username: {username}<br />
        Location: {location}
      </p>
      
    </div>
  );
};

export default Profile;
