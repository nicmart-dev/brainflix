import React, { useState } from "react";
// set initial poster

import uploadVideoPreview from "../../../assets/images/Upload-video-preview.jpg";

const UploadThumbnail = ({ FieldContainer }) => {
  const [uploadedImage, setUploadedImage] = useState(uploadVideoPreview);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="form__img-input-fields-container">
      <div>
        <h2 className="form__subtitle">Video Thumbnail</h2>
        <img src={uploadedImage} alt="video preview" className="form__img" />
      </div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {FieldContainer}
    </div>
  );
};

export default UploadThumbnail;
