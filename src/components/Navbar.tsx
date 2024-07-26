// src/components/Navbar.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/Logo.jpg';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={logo} alt="Krishi Mitra Logo" />
          <span>Krishi Mitra</span>
        </div>
        <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/soilhealth" onClick={toggleMenu}>Soil Health</Link></li>
          <li><Link to="/biddingprocess" onClick={toggleMenu}>Bidding</Link></li>
          <li><Link to="/schemes" onClick={toggleMenu}>Government Schemes</Link></li>
          <li><Link to="/knowledge" onClick={toggleMenu}>Knowledge Hub</Link></li>
          <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
          <li><Link to="/signup" onClick={toggleMenu}>Sign Up</Link></li>
        </ul>
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;