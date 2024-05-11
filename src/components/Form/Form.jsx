import { useForm } from "react-hook-form"; // we are using https://react-hook-form.com/

import Btn from "../Btn/Btn";
import FormField from "./FormField/FormField";
import { postComment, useAPI } from "../../utils/brainflix-api";
import "./Form.scss";

import uploadVideoPreview from "../../assets/images/Upload-video-preview.jpg";

/* Required dependencies to use Toast package for notification 
https://www.npmjs.com/package/react-toastify */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

function Form({
  cta,
  commentPostedVideoIds,
  setCommentPostedVideoIds,
  selectedVideo,
}) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitted },
  } = useForm();
  const navigate = useNavigate();

  /* Notify using toast package and then navigate to relevant page */
  const notifyNav = (label) => {
    // display alert message depending on button clicked using toast package.
    let msg = "";
    let type = "info";
    let route = "/"; // by default navigate to Home/video page
    switch (label) {
      case "publish":
        msg = "Video published, navigating to homepage";
        type = "success";

        break;
      case "cancel":
        msg = "Video upload cancelled, navigating back to homepage";
        type = "info";
        break;
      case "comment":
        msg = "Comment posted!";
        type = "success";
        route = ""; // don't navigate
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

  /* Form submit action. Post comments (only if comment form), 
  and navigate to relevant route. */
  const onSubmit = async (formData) => {
    try {
      if (cta === "comment") {
        // Constructs a new comment object to pass to api as body
        const commentBody = {
          name: "Anonymous fan",
          comment: formData.comment,
        };

        // handle form action differently if using api or not
        if (useAPI) {
          await postComment(selectedVideo.id, commentBody);

          // track a comment was posted for this video through grandparent component state, which triggers refresh to show newly added comment
          setCommentPostedVideoIds((prev) => [
            ...prev,
            { videoId: selectedVideo.id },
          ]);
        }

        /* TODO need to handle case when useAPI= false */
      }

      notifyNav(cta);
    } catch (error) {
      console.log("error submitting form", error);
    }
  };

  /* Display notification and navigate on non submit button click */
  const handleButtonClick = (label, event) => {
    event.preventDefault(); // Stop the default form submission behavior
    notifyNav(label);
  };

  //used to conditionally display form if user did not post comment already
  const isCommentPosted = () => {
    return commentPostedVideoIds.some(
      (item) => item.videoId === selectedVideo.id
    );
  };

  //input title field only for upload page
  const VideoTitleField = (
    <FormField
      name="title"
      label="Title your video"
      control={control}
      required
      type="input"
      placeholder="Add a title to your video"
    />
  );

  //textarea field only for upload page
  const VideoDescField = (
    <FormField
      name="description"
      label="Add a video description"
      control={control}
      required
      type="textarea"
      placeholder="Add a description to your video"
    />
  );

  const CommentTextField = (
    <FormField
      name="comment"
      label="Join the conversation"
      control={control}
      required
      type="textarea"
      placeholder="Add a new comment"
    />
  );

  // Shared fields for upload page or comments component
  const FieldContainer = (
    <div className={`form__field-container form__field-container--${cta}`}>
      {cta === "publish" && VideoTitleField}
      {cta === "publish" && VideoDescField}
      {cta === "comment" && CommentTextField}
    </div>
  );

  // Image thumbnail and fields for upload page
  const FormThumbnail = (
    <div className="form__img-input-fields-container">
      <div>
        <h2 className="form__subtitle">Video Thumbnail</h2>
        <img
          src={uploadVideoPreview}
          alt="video preview"
          className="form__img"
        />
      </div>
      {FieldContainer}
    </div>
  );

  //submit button, all forms should have one of these
  const SubmitBtn = (label) => (
    <div
      className={`form__cta-btn-container form__cta-btn-container--${label}`}
    >
      <Btn label={label} type="submit" />
    </div>
  );
  // optional cancel button if form requires it
  const CancelBtn = (
    <div className="form__cta-btn-container form__cta-btn-container--cancel">
      <Btn
        label="cancel"
        onClick={(event) => handleButtonClick("cancel", event)}
      />
    </div>
  );

  // only show cancel button on publish page
  const BtnContainer = (
    <div className="form__cta-btn-nav">
      {SubmitBtn(cta)}
      {cta === "publish" && CancelBtn}
    </div>
  );

  /* Return different form if video upload page, or in comments component.
  Disable buttons if form submitted, 
  and show message instead of form fields after posting new comment  */

  return (
    <form
      className={`form form--${cta}`}
      id={`${cta}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      {cta === "publish" && FormThumbnail}
      {cta === "comment" && !isCommentPosted() && FieldContainer}
      {cta === "comment" &&
        isCommentPosted() &&
        "Thanks for posting a comment!"}
      {cta === "publish" && !isSubmitted && BtnContainer}
      {cta === "publish" && isSubmitted && "Thanks for posting a video!"}
      {cta === "comment" && !isCommentPosted() && BtnContainer}
      <ToastContainer />
    </form>
  );
}

export default Form;
