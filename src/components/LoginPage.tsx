import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './AuthPages.css';
import logo from '../assets/Logo.jpg';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('farmer');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('role', userType);

      const response = await api.post('/users/token', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('userRole', userType);

      if (userType === 'vendor') {
        console.log('Navigating to vendor dashboard');  // Add this line
        navigate('/vendor-dashboard');
      } else {
        console.log('Navigating to farmer dashboard');  // Add this line
        navigate('/farmer-dashboard');
      }
    } catch (error: any) {
      console.error('Login failed:', error.response?.data || error.message);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src={logo} alt="Krishi Mitra Logo" className="auth-logo" />
        <h2>Welcome Back to Krishi Mitra</h2>
        <form onSubmit={handleLogin} className="auth-form">
          <div className="user-type-selection">
            <label>
              <input
                type="radio"
                value="farmer"
                checked={userType === 'farmer'}
                onChange={() => setUserType('farmer')}
              />
              Farmer
            </label>
            <label>
              <input
                type="radio"
                value="vendor"
                checked={userType === 'vendor'}
                onChange={() => setUserType('vendor')}
              />
              Vendor
            </label>
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit" className="auth-button">Log In</button>
        </form>
        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;