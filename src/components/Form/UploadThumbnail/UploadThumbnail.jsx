import React, { useState, useEffect } from "react";
import "./UploadThumbnail.scss";

// set initial poster image
import uploadVideoPreview from "../../../assets/images/Upload-video-preview.jpg";

// server api to upload image
import { uploadImage } from "../../../utils/brainflix-api";

const UploadThumbnail = ({ FieldContainer, onImageUploadFilename }) => {
  const [uploadedImage, setUploadedImage] = useState(uploadVideoPreview); // state to display image in img tag
  const [imageFile, setImageFile] = useState(null); // state to store the actual uploaded file for api upload

  const handleImageUpload = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result); // set image preview
      };
      reader.readAsDataURL(imageFile);
      setImageFile(imageFile); // set actual file to state
    }
  };

  /* upload to api selected image and pass its filename to parent form component,
  to include it during video upload */
  useEffect(() => {
    const apiImageUpload = async () => {
      if (imageFile) {
        const fileName = await uploadImage(imageFile); // upload image set in state using api server
        onImageUploadFilename(fileName); // pass the image filename to parent
      }
    };
    apiImageUpload();
  }, [imageFile, onImageUploadFilename]);

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
        required
      />
      {FieldContainer}
    </div>
  );
};

export default UploadThumbnail;
