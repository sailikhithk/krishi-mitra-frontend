// App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import SoilHealthMonitoring from './components/SoilHealthMonitoring';
import BiddingProcess from './components/BiddingProcess';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import Profile from './components/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/soilhealth" element={<SoilHealthMonitoring />} />
          <Route path="/biddingprocess" element={<BiddingProcess />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;