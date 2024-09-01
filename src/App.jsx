import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const userId = '6813802325'; // Replace with actual user ID

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL; // Access the backend URL from env variable
        const response = await axios.get(`${backendUrl}/api/users/${userId}`);
        setUser(response.data);
        console.log(response.data); // Logs the fetched user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div>
      <h1>User Information</h1>
      {user ? (
        <div>
          <p>ID: {userId}</p>
          <p>Username: {user.username}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
