import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserPage = () => {
    const { username, userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL;
                // console.log(`Fetching user data from ${backendUrl}/api/users/${userId}`);
                
                const response = await axios.get(`${backendUrl}/api/users/${userId}`, {
                    timeout: 80000, // 60 seconds timeout for debugging
                });
                
                console.log('Response data:', response.data);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                if (error.code === 'ECONNABORTED') {
                    setError('Request timeout exceeded');
                } else {
                    setError('Error fetching user data');
                }
            }
        };

        fetchUserData();
    }, [userId]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Welcome to JAYGEE, {userData.username}.</h1>
            <p>User ID: {userData.userId}</p>
            <p>Points: {userData.points}</p>
        </div>
    );
};

export default UserPage;
