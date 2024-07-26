import "./HomePage.css";
import "./Profile.css";
import appLogo from "../assets/Logo.jpg";
import ImageUploader from "./Imageupload";

function Profile() {
  return (
    <>
      <header>
        <div className="profile-logo">
          <img src={appLogo} alt="KRISHI MITRA App Logo" />
        </div>
        <div className="profile-features">
          <button className="profile-buttons">Settings</button>

          <button className="profile-buttons">Notifications</button>
          <button className="profile-buttons">Logout</button>
        </div>
      </header>
      <ImageUploader />
      <div className="user-input">
        <input type="text" aria-label="Farm Size"></input>
      </div>
    </>
  );
}

export default Profile;
