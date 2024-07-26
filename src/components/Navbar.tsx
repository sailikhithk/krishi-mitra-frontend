import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/Logo.jpg';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Krishi Mitra Logo" />
        <span>Krishi Mitra</span>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/soilhealth">Soil Health</Link></li>
        <li><Link to="/biddingprocess">Bidding</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;