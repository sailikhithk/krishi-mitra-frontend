import { FaLine, FaGlobe, FaEye, FaCalculator, FaCoins } from "react-icons/fa";
import { FaTractor, FaHandshakeSimple } from "react-icons/fa6";
import { BsCart3 } from "react-icons/bs";
import { RiPlantFill, RiLineChartFill } from "react-icons/ri";
import AppDownload from "./AppDownload";
import CropVarieties from "./CropVarieties";
import Navbar from "./Navbar";
import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaFilter } from 'react-icons/fa';
import './BiddingProcess.css';
import api from '../api';

interface Scheme {
  icon: React.ReactNode;
  title: string;
}
interface Bid {
  id: number;
  user_id: number;
  crop: string;
  quantity: number;
  price: number;
  status: string;
  created_at: string;
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
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchBids();
  }, []);

  const fetchBids = async () => {
    try {
      setLoading(true);
      const response = await api.get('/bids');
      setBids(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch bids. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filteredBids = bids.filter(bid => {
    if (filter === 'all') return true;
    return bid.status === filter;
  });

  return (
    <div className="bidding-process">
      <Navbar />
      <div className="content">
        <section className="hero">
          <h1>Agricultural Bidding Platform</h1>
          <div className="search-bar">
            <input type="text" placeholder="Search for crops..." />
            <button><FaSearch /></button>
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
        <section className="bidding-controls">
          <button className="new-bid-btn"><FaPlus /> New Bid</button>
          <div className="filter-dropdown">
            <FaFilter />
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Bids</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </section>


        <section className="bids-list">
          <h2>Active Bids</h2>
          {loading && <p>Loading bids...</p>}
          {error && <p className="error-message">{error}</p>}
          {!loading && !error && (
            <div className="bids-grid">
              {filteredBids.map((bid) => (
                <div key={bid.id} className="bid-card">
                  <h3>{bid.crop}</h3>
                  <p>Quantity: {bid.quantity} kg</p>
                  <p>Price: ₹{bid.price} per kg</p>
                  <p>Status: <span className={`status-${bid.status}`}>{bid.status}</span></p>
                  <button className="bid-details-btn">View Details</button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <CropVarieties />
      <AppDownload />
      <footer>
        <p>© 2024 Krishi Mitra. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default BiddingProcess;