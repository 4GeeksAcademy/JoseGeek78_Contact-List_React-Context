import React, { useState, useRef } from "react";

const ImgContact = ({ onImageChange }) => {
  const [image, setImage] = useState(null);
  const inputRef = useRef(null);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
        onImageChange(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="img-contact">
      <img
        src={
          image ||
          "https://yt3.googleusercontent.com/lffprsShv26Xpoyv01W8Te3ha6Y_d9LiUw95HrM3pvcAIwY6MQ1zt1fUrxRQYL9qu6KqUb6h=s900-c-k-c0x00ffffff-no-rj"
        }
        alt="Contact Image"
        className="fixed-height"
        onClick={handleImageClick}
      />
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleInputChange}
      />
    </div>
  );
};

export { ImgContact };