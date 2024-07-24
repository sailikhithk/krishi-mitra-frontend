// src/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { login, signup } from './api';

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  const handleLogin = async (email: string, password: string) => {
    const response = await login(email, password);
    setUser(response.data);
  };

  const handleSignup = async (username: string, email: string, password: string) => {
    const response = await signup(username, email, password);
    setUser(response.data);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login: handleLogin, signup: handleSignup, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
