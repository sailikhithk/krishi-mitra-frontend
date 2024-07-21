import React from "react";
import "./KnowledgeHub.css";
import AppDownload from "./AppDownload";

function KnowledgeHub() {
  const hubItems = [
    {
      image: "path_to_image1.jpg",
      title: "Select a scheme",
      description: "Discover available schemes nearby",
    },
    {
      image: "path_to_image2.jpg",
      title: "Learn",
      description: "Educational farming tips",
    },
    {
      image: "path_to_image3.jpg",
      title: "Track orders",
      description: "Track your transactions easily",
    },
    {
      image: "path_to_image4.jpg",
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
