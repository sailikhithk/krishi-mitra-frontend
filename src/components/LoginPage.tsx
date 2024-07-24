import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post('/users/token', {
        username,
        password,
      });
      // Handle successful login (e.g., store token, navigate to another page)
      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.access_token);
      navigate('/');
    } catch (error) {
      // Handle error
      console.error('Login failed:', error.response.data);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Username" 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
