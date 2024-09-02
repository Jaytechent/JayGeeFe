import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const userId = '6813802325'; // Replace with actual user ID

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL; // Access the backend URL from env variable
        console.log(`Fetching user data from ${backendUrl}/api/users/${userId}`); // Debugging line
        const response = await axios.get(`${backendUrl}/api/users/${userId}`, {
          timeout: 10000, // Set timeout to 10000ms (10 seconds) for debugging
        });
        setUser(response.data);
        console.log(response.data); // Logs the fetched user data
      } catch (error) {
        if (error.code === 'ECONNABORTED') {
          console.error('Request timeout exceeded');
        } else {
          console.error('Error fetching user data:', error);
        }
        setError(error.message);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div>
      <h1>User Information</h1>
      {error && <p>Error: {error}</p>}
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
