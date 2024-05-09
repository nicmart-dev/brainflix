import Btn from "../Btn/Btn";
import "./Form.scss";

import uploadVideoPreview from "../../assets/images/Upload-video-preview.jpg";

/* Required dependencies to use Toast package for notification 
https://www.npmjs.com/package/react-toastify */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

function Form({ cta }) {
  const navigate = useNavigate();

  const handleButtonClick = (label) => {
    // display alert message depending on button clicked using toast package.
    let msg = "";
    let type = "info";
    let route = "/"; // by default navigate to Home/video page
    switch (label) {
      case "publish":
        msg = "Upload complete";
        type = "success";

        break;
      case "cancel":
        msg = "Cancelling, going back to homepage";
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
    });
  };

  return (
    <>
      <form className="form" id={`${cta}-new-comment-form`}>
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
                required
                placeholder="Add a title to your video"
              ></input>
            </div>
            <div className="form__label-field-container">
              <label htmlFor={`${cta}-textarea`}>Add a video description</label>
              <textarea
                id={`${cta}-textarea`}
                required
                placeholder="Add a description to your video"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="form__cta-btn-nav">
          <div className="form__cta-btn-container">
            <Btn label="publish" onClick={() => handleButtonClick("publish")} />
          </div>
          <div className="form__cta-btn-container">
            <Btn label="cancel" onClick={() => handleButtonClick("cancel")} />
          </div>
        </div>
        <ToastContainer />
      </form>
    </>
  );
}

export default Form;
