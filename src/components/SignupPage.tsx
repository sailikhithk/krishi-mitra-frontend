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
      const response = await api.post('/users', { 
        username, 
        email, 
        hashed_password: password 
      });
      console.log('Signup successful:', response.data);
      navigate('/'); // Redirect to home page after successful signup
    } catch (error) {
      console.error('Signup failed:', error);
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