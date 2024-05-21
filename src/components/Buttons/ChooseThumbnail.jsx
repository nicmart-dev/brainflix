import React from "react";
import Button from "../Button/Button";

/* Choose Thumnbail button in video upload page*/
const ChooseThumbnail = ({ handleButtonClick }) => (
  <div className="form__cta-btn-container form__cta-btn-container--thumbnail">
    <Button
      label="CHoose image"
      onClick={(event) => {
        event.preventDefault(); // Prevent form submission
        handleButtonClick(event);
      }}
    />
  </div>
);

export default ChooseThumbnail;
