import React from 'react';
import SoilHealthMonitoring from './SoilHealthMonitoring';
import BiddingProcess from './BiddingProcess';

const FarmerDashboard: React.FC = () => {
  return (
    <div>
      <h1>Farmer Dashboard</h1>
      <SoilHealthMonitoring />
      <BiddingProcess />
    </div>
  );
};

export default FarmerDashboard;