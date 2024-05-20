import React from "react";
import Btn from "../Button/Button";

/* submit button, all forms should have one of these  */
const SubmitBtn = ({ label }) => (
  <div className={`form__cta-btn-container form__cta-btn-container--${label}`}>
    <Btn label={label} type="submit" />
  </div>
);

export default SubmitBtn;
