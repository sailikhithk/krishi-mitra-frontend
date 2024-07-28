// src/components/Profile.tsx

import React from 'react';
import "./Profile.css";
import Navbar from "./Navbar";
import ImageUploader from "./Imageupload";

function Profile() {
  return (
    <div className="profile-page">
      <Navbar />
      <div className="content">
        <h1>User Profile</h1>
        <div className="profile-content">
          <ImageUploader />
          <div className="user-info">
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Farm Size" />
            {/* Add more profile fields as needed */}
          </div>
          <button className="save-profile">Save Profile</button>
        </div>
      </div>
      <footer>
        <p>© 2024 Farmer Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Profile;