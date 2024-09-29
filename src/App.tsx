// App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import SoilHealthMonitoring from './components/SoilHealthMonitoring';
import BiddingProcess from './components/BiddingProcess';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import Profile from './components/Profile';
import FarmerDashboard from './components/FarmerDashboard';
import VendorDashboard from './components/VendorDashboard';
import './App.css';

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

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
          <Route path="farmer-dashboard" element={<FarmerDashboard />} />
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;