import React from "react";
import Btn from "../Button/Button";

/* optional cancel button if form requires it */
const CancelBtn = ({ handleButtonClick }) => (
  <div className="form__cta-btn-container form__cta-btn-container--cancel">
    <Btn
      label="cancel"
      onClick={(event) => handleButtonClick("cancel", event)}
    />
  </div>
);

export default CancelBtn;
