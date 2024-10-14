import React from 'react';
// Import images
import farmImage from '../assets/farm.jpg';
import bellpepperImage from '../assets/bellpepper.webp';
import capsicumImage from '../assets/capsicum.jpg';
import chilliImage from '../assets/chilli.webp';
import spinachImage from '../assets/spinach.webp';
import tomatoImage from '../assets/tomato.webp';
import potatoImage from '../assets/potato.webp';
import radishImage from '../assets/radish.webp';

function CropVarieties() {
  const hubItems = [
    {
      image: bellpepperImage,
      title: "Bell Pepper",
    },
    {
      image: capsicumImage,
      title: "Capsicum",
    },
    {
      image: chilliImage,
      title: "Chilli",
    },
    {
      image: spinachImage,
      title: "Spinach",
    },
    {
      image: tomatoImage,
      title: "Tomato",
    },
    {
      image: potatoImage,
      title: "Potato",
    },
    {
      image: radishImage,
      title: "Radish",
    },
  ];

  return (
    <div className="knowledge-hub">
      <h3>Crop Varieties</h3>
      <div className="hub-grid">
        {hubItems.map((item, index) => (
          <div key={index} className="hub-item">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <button>Buy</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CropVarieties;