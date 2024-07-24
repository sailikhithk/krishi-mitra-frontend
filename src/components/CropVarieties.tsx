function CropVarieties() {
  const hubItems = [
    {
      image: "path_to_image1.jpg",
      title: "Corn",
    },
    {
      image: "path_to_image2.jpg",
      title: "Potato",
    },
    {
      image: "path_to_image3.jpg",
      title: "Wheat",
    },
    {
      image: "path_to_image4.jpg",
      title: "Rice",
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
