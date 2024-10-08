import React from "react";
import "./KnowledgeHub.css";

// Import resized images
import governmentSchemes from "../assets/AP-Government-Schemes-List.jpg";
import learn from "../assets/education (1).jpg";
import trackOrders from "../assets/tractors.jpg";
import rateUs from "../assets/rate-us.jpg";

function KnowledgeHub() {
  const hubItems = [
    {
      image: governmentSchemes,
      title: "Select a scheme",
      description: "Discover available schemes nearby",
    },
    {
      image: learn,
      title: "Learn",
      description: "Educational farming tips",
    },
    {
      image: trackOrders,
      title: "Track orders",
      description: "Track your transactions easily",
    },
    {
      image: rateUs,
      title: "Rate us!",
      description: "Share your feedback with us",
    },
  ];

  return (
    <div className="knowledge-hub">
      <h2>Knowledge hub</h2>
      <div className="hub-grid">
        {hubItems.map((item, index) => (
          <div key={index} className="hub-item">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KnowledgeHub;