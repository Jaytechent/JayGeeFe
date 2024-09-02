import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserPage from './Userpage'; 
import Homepage from './Homepage'; 
function App() {
    return (
        <Router>
            <Routes>
            <Route exact path="/" component={Homepage} />
                <Route path="/:username/:userId" element={<UserPage />} />
                
            </Routes>
        </Router>
    );
}

export default App;
