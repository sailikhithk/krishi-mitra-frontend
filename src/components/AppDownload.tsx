import React from "react";
import "./AppDownload.css";
import appLogo from "../assets/Logo.jpg";
import googlePlayStore from "../assets/google-playstore.png";

function AppDownload() {
  return (
    <div className="app-download">
      <div className="app-info">
        <h2>Download the KRISHI MITRA app now!</h2>
        <p>App available in multiple stores for your convenience</p>
        <div className="download-buttons">
          <button className="app-store">Download from App Store</button>
          <button className="google-play">
            <img
              src={googlePlayStore}
              alt="Google Play"
              className="store-badge"
            />
          </button>
          <button className="other-store">Download from Uizard</button>
        </div>
      </div>
      <div className="app-logo">
        <img src={appLogo} alt="KRISHI MITRA App Logo" />
        <h3>KRISHI MITRA</h3>
        <p>FARM FRIEND</p>
      </div>
    </div>
  );
}

export default AppDownload;
