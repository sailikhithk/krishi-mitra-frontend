import React, { useState } from 'react';
import './SoilHealthMonitoring.css';
import { FaLeaf, FaThermometerHalf, FaTint, FaVial, FaTruck, FaChartBar, FaArrowLeft } from 'react-icons/fa';
import { RiPlantFill } from 'react-icons/ri';
import { GiMeshBall } from 'gi-icons/gi';
import Navbar from './Navbar';
import PieCharts from './PieCharts';
import BarCharts from './BarCharts';
import AreaCharts from './AreaChart';
import LineCharts from './LineChart';
import appLogo from '../assets/Logo.jpg';

const SoilHealthMonitoring: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('soil-testing');
  const [showHistory, setShowHistory] = useState(false);

  const metrics = [
    { icon: <FaVial />, name: 'Soil Testing', value: 'soil-testing' },
    { icon: <FaThermometerHalf />, name: 'Soil Moisture', value: 'soil-moisture' },
    { icon: <FaTint />, name: 'Soil pH', value: 'soil-ph' },
    { icon: <FaLeaf />, name: 'Organic Matter', value: 'organic-matter' },
    { icon: <RiPlantFill />, name: 'Nutrient Levels', value: 'nutrient-levels' },
    { icon: <GiMeshBall />, name: 'Soil Texture', value: 'soil-texture' },
  ];

  const recommendations = [
    { icon: <RiPlantFill />, name: 'Crop Rotation' },
    { icon: <FaTruck />, name: 'Fertilizer Application' },
    { icon: <FaTint />, name: 'Irrigation Management' },
    { icon: <FaLeaf />, name: 'Cover Cropping' },
  ];

  const soilTestingResults = [
    { image: "path_to_image1.jpg", title: "Capsicum" },
    { image: "path_to_image2.jpg", title: "Chilli" },
    { image: "path_to_image3.jpg", title: "Bell pepper" },
    { image: "path_to_image4.jpg", title: "Spinach" },
    { image: "path_to_image5.jpg", title: "Tomato" },
    { image: "path_to_image6.jpg", title: "Potato" },
    { image: "path_to_image7.jpg", title: "Radish" },
  ];

  const renderMetricDetails = () => {
    switch (selectedMetric) {
      case 'soil-testing':
        return (
          <div className="metric-details">
            <h3>Soil Testing Results</h3>
            <p>Last tested: 15 days ago</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: '75%' }}></div>
            </div>
            <p>Soil health score: 75/100</p>
            <p>Next recommended test: In 45 days</p>
            <BarCharts />
          </div>
        );
      case 'soil-moisture':
        return (
          <div className="metric-details">
            <h3>Soil Moisture</h3>
            <p>Current moisture level: 35%</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: '35%' }}></div>
            </div>
            <p>Optimal range: 30-40%</p>
            <AreaCharts />
          </div>
        );
      // ... other cases
    }
  };

  return (
    <div className="soil-health-monitoring">
      <Navbar />
      <div className="content">
        <header className="soil-health-header">
          <img src={appLogo} alt="KRISHI MITRA App Logo" />
          <h1>Soil Health Monitoring</h1>
        </header>

        <div className="main-content">
          {!showHistory ? (
            <>
              <div className="farm-image"></div>

              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <div className="overall-score">
                    <PieCharts />
                    <h4>Overall Score</h4>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="projected-score">
                    <PieCharts />
                    <h4>Projected Score</h4>
                  </div>
                </div>
              </div>

              <div className="soil-metrics">
                {metrics.map((metric) => (
                  <div 
                    key={metric.value} 
                    className={`metric ${selectedMetric === metric.value ? 'active' : ''}`}
                    onClick={() => setSelectedMetric(metric.value)}
                  >
                    {metric.icon}
                    <span>{metric.name}</span>
                  </div>
                ))}
              </div>

              <div className="soil-health-results">
                <h2>Soil Health Analysis</h2>
                {renderMetricDetails()}
              </div>

              <div className="soiltest-results">
                <h2>Soil Testing Results</h2>
                <div className="hub-grid">
                  {soilTestingResults.map((item, index) => (
                    <div key={index} className="hub-item">
                      <img src={item.image} alt={item.title} />
                      <h5>{item.title}</h5>
                    </div>
                  ))}
                </div>
              </div>

              <div className="recommendations">
                <h2>Recommendations</h2>
                <div className="recommendation-icons">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="icon-item">
                      {rec.icon}
                      <span>{rec.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="charts-row">
                <div className="chart-container">
                  <BarCharts />
                  <h4>Fertilizers Results</h4>
                </div>
                <div className="chart-container">
                  <AreaCharts />
                  <h4>Crop Yield</h4>
                </div>
                <div className="chart-container">
                  <LineCharts />
                  <h4>Temperature</h4>
                </div>
              </div>

              <div className="historical-data">
                <h2>Historical Data</h2>
                <FaChartBar size={24} />
                <p>View trends and patterns in your soil health over time</p>
                <button className="view-history" onClick={() => setShowHistory(true)}>View History</button>
              </div>
            </>
          ) : (
            <div className="historical-view">
              <h2>Soil Health Historical Data</h2>
              <div className="chart-container">
                <LineCharts />
              </div>
              <div className="historical-summary">
                <h3>Summary</h3>
                <ul>
                  <li>pH levels have remained stable within the optimal range (6.0-7.5)</li>
                  <li>Soil moisture has fluctuated seasonally but stayed within acceptable limits</li>
                  <li>Organic matter content has shown a gradual increase over the year</li>
                </ul>
              </div>
              <button className="back-button" onClick={() => setShowHistory(false)}>
                <FaArrowLeft /> Back to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SoilHealthMonitoring;