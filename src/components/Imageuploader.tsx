import React, { useState, useRef } from "react";
import "./ImageUploader.css";

const ImageUploader: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="image-uploader">
      <div className="image-container">
        {image ? (
          <img src={image} alt="Uploaded" className="profile-image" />
        ) : (
          <div className="placeholder">No Image</div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <button onClick={handleButtonClick} className="upload-button">
        Upload Image
      </button>
    </div>
  );
};

export default ImageUploader;