import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './AuthPages.css';
import logo from '../assets/Logo.jpg';

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('farmer');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/signup', {
        username,
        email,
        password, // Changed from hashed_password to password
        role: userType
      });
      console.log('Signup successful:', response.data);
      alert('Signup successful! Please log in.');
      navigate('/login');
    } catch (error: any) {
      console.error('Signup failed:', error.response?.data || error.message);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src={logo} alt="Krishi Mitra Logo" className="auth-logo" />
        <h2>Join Krishi Mitra</h2>
        <form onSubmit={handleSignup} className="auth-form">
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
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit" className="auth-button">Sign Up</button>
        </form>
        <p>
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;