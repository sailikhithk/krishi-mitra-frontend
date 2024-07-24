import React from 'react';
import { FaLine, FaGlobe, FaEye, FaCalculator, FaCoins } from "react-icons/fa";
import { FaTractor, FaHandshakeSimple } from "react-icons/fa6";
import { BsCart3 } from "react-icons/bs";
import { RiPlantFill, RiLineChartFill } from "react-icons/ri";
import AppDownload from "./AppDownload";
import CropVarieties from "./CropVarieties";
import './BiddingProcess.css';

interface Scheme {
  icon: React.ReactNode;
  title: string;
}

const BiddingProcess: React.FC = () => {
  const schemes: Scheme[] = [
    { icon: <RiPlantFill />, title: "Fresh produce for merchants" },
    { icon: <FaHandshakeSimple />, title: "Secure transactions for suppliers" },
    { icon: <FaTractor />, title: "Farm tools for farmers" },
    { icon: <RiLineChartFill />, title: "Market price forecasts" },
    { icon: <FaCoins />, title: "Price discovery insights" },
    { icon: <FaCalculator />, title: "Financial planning tools" },
  ];

  return (
    <div className="bidding-process">
      <section className="hero">
        <h1>Real-time market Prices for your crops</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter your crops to see price updates"
          />
          <button>Search</button>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <FaLine className="feature-icon" />
          <h3>Price trends</h3>
          <p>Historical and future</p>
        </div>
        <div className="feature">
          <FaGlobe className="feature-icon" />
          <h3>Online</h3>
          <p>Buy and sell with ease</p>
        </div>
        <div className="feature">
          <BsCart3 className="feature-icon" />
          <h3>Demand</h3>
          <p>Stay ahead with the market</p>
        </div>
        <div className="feature">
          <FaEye className="feature-icon" />
          <h3>Price tracking</h3>
          <p>Track market trends live</p>
        </div>
      </section>

      <div className="bidding-platform">
        <div className="schemes-header">
          <h2>Bidding Platform</h2>
          <button className="view-all">See all</button>
        </div>
        <div className="schemes-grid">
          {schemes.map((scheme, index) => (
            <div key={index} className="scheme-card">
              <button className="details-button">Details</button>
              <div className="scheme-icon">{scheme.icon}</div>
              <h5>{scheme.title}</h5>
            </div>
          ))}
        </div>
      </div>

      <CropVarieties />
      <AppDownload />

      <footer>
        <p>© 2024 Farmer Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default BiddingProcess;