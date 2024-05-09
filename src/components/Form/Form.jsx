import { useState, useEffect } from "react";

import Btn from "../Btn/Btn";
import "./Form.scss";

import uploadVideoPreview from "../../assets/images/Upload-video-preview.jpg";

/* Required dependencies to use Toast package for notification 
https://www.npmjs.com/package/react-toastify */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

function Form({ cta }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // change handler for all inputs
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleChangeDesc = (event) => {
    setDescription(event.target.value);
  };

  /* Notify using toast package and then navigate to relevant page */
  const notifyNav = (label) => {
    // display alert message depending on button clicked using toast package.
    let msg = "";
    let type = "info";
    let route = "/"; // by default navigate to Home/video page
    switch (label) {
      case "publish":
        msg = "Video published, navigating to home page";
        type = "success";

        break;
      case "cancel":
        msg = "Video upload cancelled, navigating back to homepage";
        type = "info";
        break;
      case "comment":
        msg = "Comment posted!";
        type = "success";
        break;
      default:
      //otherwise use values already set during variables init
    }
    /* display toast but navigate to route only if closing toast manually,
    or auto close after default 8 sec timer, per https://fkhadra.github.io/react-toastify/define-callback */
    toast[type](msg, {
      onClose: () => navigate(route),
      position: "bottom-right",
    });
  };

  /* Check if the fields are all filled using default browser validation */
  const isFormValid = (event) => {
    const form = event.target;
    if (!form) return false;
    else return form.checkValidity();
  };

  /* Navigate to Home/video page on form submit */
  const handleSubmit = (event) => {
    event.preventDefault();

    if (isFormValid(event)) {
      notifyNav("publish");
    }
  };

  /* Display notification and navigate on non submit button click */
  const handleButtonClick = (label, event) => {
    event.preventDefault(); // Stop the default form submission behavior
    notifyNav(label);
  };

  return (
    <>
      <form
        className={`form form--${cta}`}
        id={`${cta}`}
        onSubmit={handleSubmit}
      >
        <div className="form__img-input-fields-container">
          <div>
            <h2 className="form__subtitle">Video Thumbnail</h2>
            <img src={uploadVideoPreview} alt="" className="form__img" />
          </div>
          <div className="form__container">
            <div className="form__label-field-container">
              <label htmlFor={`${cta}-input`}>Title your video</label>
              <input
                id={`${cta}-input`}
                name="video"
                required
                placeholder="Add a title to your video"
                onChange={handleChangeTitle}
              ></input>
            </div>
            <div className="form__label-field-container">
              <label htmlFor={`${cta}-textarea`}>Add a video description</label>
              <textarea
                id={`${cta}-textarea`}
                name="description"
                required
                placeholder="Add a description to your video"
                onChange={handleChangeDesc}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="form__cta-btn-nav">
          <div className="form__cta-btn-container">
            <Btn label="publish" type="submit" />
          </div>
          <div className="form__cta-btn-container">
            <Btn
              label="cancel"
              onClick={(event) => handleButtonClick("cancel", event)}
            />
          </div>
        </div>
        <ToastContainer />
      </form>
    </>
  );
}

export default Form;
