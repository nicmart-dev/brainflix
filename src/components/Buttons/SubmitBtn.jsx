import React from "react";
import Button from "../Button/Button";

/* submit button, all forms should have one of these  */
const SubmitBtn = ({ label }) => (
  <div className={`form__cta-btn-container form__cta-btn-container--${label}`}>
    <Button label={label} type="submit" />
  </div>
);

export default SubmitBtn;
