import React from 'react';
import "./Profile.css";
import Navbar from "./Navbar";
import ImageUploader from "./Imageupload";
import logo from "../assets/Logo.jpg";
import { FaCog, FaBell, FaSignOutAlt, FaEdit, FaEye } from 'react-icons/fa';

function Profile() {
  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-header">
        <h1>Edit Profile</h1>
        <div className="profile-actions">
          <button className="action-button"><FaCog /> Settings</button>
          <button className="action-button"><FaBell /> Notifications</button>
          <button className="action-button"><FaSignOutAlt /> Logout</button>
        </div>
      </div>
      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="logo-container">
            <img src={logo} alt="Krishi Mitra Logo" className="profile-logo" />
          </div>
          <div className="profile-image-container">
            <ImageUploader />
          </div>
          <h2>Farmer</h2>
          <div className="profile-buttons">
            <button className="profile-button"><FaEdit /> Edit Profile</button>
            <button className="profile-button"><FaEye /> View Activity</button>
          </div>
        </div>
        <div className="profile-details">
          <div className="profile-section">
            <h3>Farm Size</h3>
            <p>150 acres</p>
          </div>
          <div className="profile-section">
            <h3>Crops</h3>
            <p>Grapes, Onions</p>
          </div>
          <div className="profile-section">
            <h3>Location</h3>
            <p>Nashik, Maharashtra</p>
          </div>
          <div className="profile-section">
            <h3>Notification Preferences</h3>
            <div className="notification-buttons">
              <button>Email Notifications</button>
              <button>SMS Notifications</button>
            </div>
          </div>
          <div className="profile-section">
            <h3>Account Settings</h3>
            <div className="account-buttons">
              <button>Edit Account</button>
              <button>Change Password</button>
            </div>
          </div>
          <div className="profile-section">
            <h3>Language</h3>
            <div className="language-buttons">
              <button>English</button>
              <button>Hindi</button>
            </div>
          </div>
          <div className="profile-section">
            <h3>Support</h3>
            <div className="support-buttons">
              <button>FAQs</button>
              <button>Contact Us</button>
            </div>
          </div>
          <div className="profile-section">
            <h3>Identity Documents</h3>
            <div className="document-item">
              <span>Aadhaar Card</span>
              <button>Edit</button>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <p>© 2024 Farmer Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Profile;