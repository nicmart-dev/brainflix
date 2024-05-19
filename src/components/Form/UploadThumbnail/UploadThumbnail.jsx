import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UploadThumbnail.scss";

// set initial poster
import uploadVideoPreview from "../../../assets/images/Upload-video-preview.jpg";

const UploadThumbnail = ({ FieldContainer }) => {
  const [uploadedImage, setUploadedImage] = useState(uploadVideoPreview);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  useEffect(() => {
    const uploadImage = async (imageData) => {
      try {
        const formData = new FormData();
        formData.append("poster", imageData);

        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/videos/image?api_key=08e96fed-b453-49f7-b10e-6342cdd61c6a`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          console.log("Image uploaded successfully");
        }
      } catch (error) {
        console.error("Error uploading image", error);
      }
    };

    if (uploadedImage !== uploadVideoPreview) {
      // Check if the uploaded image is different from the default preview
      uploadImage(uploadedImage);
    }
  }, [uploadedImage]);

  return (
    <div className="upload-thumb__container">
      <div>
        <h2 className="upload-thumb__subtitle">Video Thumbnail</h2>
        <img
          src={uploadedImage}
          alt="video preview"
          className="upload-thumb__img"
        />
      </div>
      <input
        name="poster"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
      {FieldContainer}
    </div>
  );
};

export default UploadThumbnail;
