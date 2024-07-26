import React from "react";
import "./HomePage.css";
import { BsCart3 } from "react-icons/bs";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { GrDeliver } from "react-icons/gr";
import { FaRegClock } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import GovernmentSchemes from "./GovernmentSchemes";
import KnowledgeHub from "./KnowledgeHub";
import AppDownload from "./AppDownload";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="home-page">
      <header>
        <div className="logo">KRISHIMITRA</div>

        <div className="feature">
          <button className="explore-features">Explore features</button>
          <Link to="/profile" className="profile-icon">
            <CgProfile />
          </Link>
        </div>
      </header>

      <section className="hero">
        <h1>Empowering farmers with technology!</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter your location for personalized insights"
          />
          <button>Search</button>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <TiWeatherPartlySunny className="feature-icon" />
          <h3>Enhancing crop</h3>
          <p>Real-time weather updates</p>
        </div>
        <div className="feature">
          <BsCart3 className="feature-icon" />
          <h3>Market</h3>
          <p>Efficiency guaranteed</p>
        </div>
        <div className="feature">
          <GrDeliver className="feature-icon" />
          <h3>Timely deliveries</h3>
          <p>Fast and reliable</p>
        </div>
        <div className="feature">
          <FaRegClock className="feature-icon" />
          <h3>Live updates</h3>
          <p>Stay updated on orders</p>
        </div>
      </section>

      <GovernmentSchemes />
      <KnowledgeHub />
      <AppDownload />

      <footer>
        <p>© 2024 Farmer Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
