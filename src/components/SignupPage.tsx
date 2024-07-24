import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await api.post('/users/signup', { 
        username, 
        email, 
        hashed_password: password 
      });
      // Handle successful signup (e.g., store token, navigate to another page)
      console.log('Signup successful:', response.data);
      window.alert('Signup successful! Please log in.');
      navigate('/login'); // Redirect to login page after successful signup
    } catch (error: any) {
      // Handle error
      console.error('Signup failed:', error.response?.data || error.message);
      window.alert('Signup failed. Please try again.');
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Username" 
      />
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
      />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default SignupPage;
