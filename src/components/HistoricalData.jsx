import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HistoricalData: React.FC = () => {
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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Soil Health Historical Data',
      },
    },
  };

  return (
    <div className="historical-data-view">
      <h2>Soil Health Historical Data</h2>
      <div className="chart-container">
        <Line options={options} data={historicalData} />
      </div>
      <div className="historical-summary">
        <h3>Summary</h3>
        <ul>
          <li>pH levels have remained stable within the optimal range (6.0-7.5)</li>
          <li>Soil moisture has fluctuated seasonally but stayed within acceptable limits</li>
          <li>Organic matter content has shown a gradual increase over the year</li>
        </ul>
      </div>
    </div>
  );
};

export default HistoricalData;