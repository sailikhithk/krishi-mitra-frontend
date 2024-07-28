import React, { useState } from 'react';
import './SoilHealthMonitoring.css';
import { FaLeaf, FaThermometerHalf, FaTint, FaVial, FaTruck, FaChartBar, FaArrowLeft } from 'react-icons/fa';
import { RiPlantFill } from 'react-icons/ri';
import { GiMeshBall } from 'react-icons/gi';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Navbar from './Navbar';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SoilHealthMonitoring = () => {
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

  const nutrientLevels = {
    nitrogen: 65,
    phosphorus: 45,
    potassium: 80,
    calcium: 70,
    magnesium: 55,
  };

  const moistureData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Soil Moisture (%)',
        data: [30, 35, 28, 32, 36, 35],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const pHData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Soil pH',
        data: [6.5, 6.8, 6.2, 6.7, 6.9, 7.0],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  const historicalData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Soil pH',
        data: [6.5, 6.8, 6.2, 6.7, 6.9, 7.0, 6.8, 6.5, 6.3, 6.6, 6.9, 7.1],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
      {
        label: 'Soil Moisture (%)',
        data: [30, 35, 28, 32, 36, 35, 33, 30, 29, 31, 34, 36],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Organic Matter (%)',
        data: [3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.1, 4.2, 4.3],
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.1,
      },
    ],
  };

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
            <div className="chart-container">
              <Line data={moistureData} />
            </div>
          </div>
        );
      case 'soil-ph':
        return (
          <div className="metric-details">
            <h3>Soil pH</h3>
            <p>Current pH level: 7.0</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: '70%' }}></div>
            </div>
            <p>Optimal range: 6.0-7.5</p>
            <div className="chart-container">
              <Line data={pHData} />
            </div>
          </div>
        );
      case 'organic-matter':
        return (
          <div className="metric-details">
            <h3>Organic Matter</h3>
            <p>Current level: 3.5%</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: '70%' }}></div>
            </div>
            <p>Optimal range: 3-5%</p>
            <p>Recommendation: Add compost to increase organic matter</p>
          </div>
        );
      case 'nutrient-levels':
        return (
          <div className="metric-details">
            <h3>Nutrient Levels</h3>
            {Object.entries(nutrientLevels).map(([nutrient, level]) => (
              <div key={nutrient}>
                <p>{nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}: {level}%</p>
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${level}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'soil-texture':
        return (
          <div className="metric-details">
            <h3>Soil Texture</h3>
            <p>Texture: Loam</p>
            <p>Sand: 40%</p>
            <p>Silt: 40%</p>
            <p>Clay: 20%</p>
            <p>Recommendation: Ideal for most crops</p>
          </div>
        );
      default:
        return <p>Select a metric to view details</p>;
    }
  };

  return (
    <div className="soil-health-monitoring">
      <Navbar />
      <div className="content">
        <div className="main-content">
          {!showHistory ? (
            <>
              <div className="farm-image"></div>

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
                <Line 
                  data={historicalData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      title: {
                        display: true,
                        text: 'Soil Health Trends',
                      },
                    },
                  }}
                />
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
