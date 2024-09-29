import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './AdminLogin.css';
import logo from '../assets/Logo.jpg';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('admin');
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
      console.log('Admin login successful:', response.data);
      localStorage.setItem('adminToken', response.data.access_token);
      localStorage.setItem('userRole', userType);
      
      if (userType==='admin')
      {
        console.log('Navigating to admin dashboard');
        navigate('/admin-dashboard');
      }
      else
      {
        console.error('ERROR! User is not admin');
      }
    } catch (error: any) {
      console.error('Admin login failed:', error.response?.data || error.message);
      alert('Admin login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src={logo} alt="Krishi Mitra Logo" className="auth-logo" />
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin} className="auth-form">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Admin Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin Password"
            required
          />
          <button type="submit" className="auth-button">Admin Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;