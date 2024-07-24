import React from "react";
import "./GovernmentSchemes.css";
import { RiPlantFill } from "react-icons/ri";
import { FaWater } from "react-icons/fa6";
import { FaLeaf } from "react-icons/fa";
import { FaHandshakeSimple } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";
import { TbArrowsLeftRight } from "react-icons/tb";
import { Link } from "react-router-dom";

function GovernmentSchemes() {
  const schemes = [
    { icon: <RiPlantFill />, title: "Healthy Crops" },
    { icon: <FaWater />, title: "Water optimization" },
    { icon: <FaLeaf />, title: "Pesticide management" },
    { icon: <FaHandshakeSimple />, title: "Efficient bidding process" },
    { icon: <FaPeopleGroup />, title: "Vendor interactions" },
    { icon: <TbArrowsLeftRight />, title: "Buyer Connections" },
  ];

  return (
    <div className="government-schemes">
      <div className="schemes-header">
        <h2>Government schemes</h2>
        <button className="view-all">View all</button>
      </div>
      <div className="schemes-grid">
        {schemes.map((scheme, index) => (
          <div key={index} className="scheme-card">
            <button className="details-button">Details</button>
            <Link to="/biddingprocess" className="scheme-icon">
              {scheme.icon}
            </Link>
            <h3>{scheme.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GovernmentSchemes;
