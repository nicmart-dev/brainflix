import React, { useState, useEffect } from "react";
import "./UploadThumbnail.scss";

// set initial poster image
import uploadVideoPreview from "../../assets/images/Upload-video-preview.jpg";

// server api to upload image
import { uploadImage } from "../../utils/brainflix-api";

const UploadThumbnail = ({ FieldContainer, onImageUploadFilename }) => {
  const [uploadedImage, setUploadedImage] = useState(uploadVideoPreview); // state to display image in img tag
  const [imageFile, setImageFile] = useState(null); // state to store the actual uploaded file for api upload

  const handleImageUpload = async () => {
    try {
      // client side strict validation to only accept image files
      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: "Images",
            accept: {
              "image/*": [
                ".jpg",
                ".jpeg",
                ".png",
                ".gif",
                ".bmp",
                ".webp",
                ".svg",
              ],
            },
          },
        ],
        excludeAcceptAllOption: true,
      });

      const file = await fileHandle.getFile();
      setImageFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result); // set image preview
      };
      reader.readAsDataURL(file); // Convert to base64 string
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error selecting file:", error);
      }
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
      <button name="poster" type="button" onClick={handleImageUpload} required>
        Choose Thumbnail
      </button>
      {FieldContainer}
    </div>
  );
};

export default UploadThumbnail;
