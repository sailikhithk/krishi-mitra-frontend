import React from 'react';
import './SoilHealthMonitoring.css';
import { FaLeaf, FaThermometerHalf, FaTint, FaVial, FaTruck } from 'react-icons/fa';
import { RiPlantFill } from 'react-icons/ri';

const SoilHealthMonitoring: React.FC = () => {
  return (
    <div className="soil-health-monitoring">
      <header>
        <div className="logo">Krishi Mitra</div>
        <h1>Soil Health Monitoring</h1>
        <div className="header-icons">
          <span className="icon">👤</span>
          <span className="icon">⚙️</span>
          <span className="icon">🔔</span>
        </div>
      </header>

      <div className="main-content">
        <div className="farm-image">
          {/* Farm image background */}
        </div>

        <div className="soil-metrics">
          <div className="metric">
            <FaVial />
            <span>Soil Testing</span>
          </div>
          <div className="metric">
            <FaThermometerHalf />
            <span>Soil Moisture</span>
          </div>
          <div className="metric">
            <FaTint />
            <span>Soil pH</span>
          </div>
          <div className="metric">
            <FaLeaf />
            <span>Organic Matter</span>
          </div>
          <div className="metric">
            <RiPlantFill />
            <span>Nutrient Levels</span>
          </div>
          <div className="metric">
            <FaTruck />
            <span>Recommendations</span>
          </div>
        </div>

        <div className="soil-health-results">
          <h2>Soil Health Results</h2>
          <div className="results-grid">
            <div className="result-item">
              <h3>Soil Testing</h3>
              <div className="progress-bar">
                {/* Implement progress bar */}
              </div>
            </div>
            {/* Add more result items for other metrics */}
          </div>
        </div>

        <div className="recommendations">
          <h2>Recommendations</h2>
          <div className="recommendation-icons">
            <div className="icon-item">
              <RiPlantFill />
              <span>Plant 1</span>
            </div>
            <div className="icon-item">
              <RiPlantFill />
              <span>Plant 2</span>
            </div>
            <div className="icon-item">
              <RiPlantFill />
              <span>Plant 3</span>
            </div>
            <div className="icon-item">
              <FaTruck />
              <span>Fertilizer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilHealthMonitoring;