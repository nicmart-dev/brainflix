import { useState } from "react";
import { useForm } from "react-hook-form"; // we are using https://react-hook-form.com/

import Btn from "../Btn/Btn";
import FormField from "./FormField/FormField";
import {
  postVideo,
  postComment,
  deleteComment,
} from "../../utils/brainflix-api";
import "./Form.scss";

import UploadThumbnail from "./UploadThumbnail/UploadThumbnail"; // Image thumbnail and fields for upload page

import { notifyNav } from "../../utils/notification"; // Import the notifyNav function
import { useNavigate } from "react-router-dom"; // for the notifyNav function

function Form({
  cta,
  selectedVideoId,
  commentId,
  setCommentLiked,
  toggleCommentChange,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate(); // Use navigate for route changes within notification function

  const [posterImageFileName, setPosterImageFileName] = useState(null); // state to store the uploaded poster image file
  const [resetFlag, setResetFlag] = useState(false); // use to propagate reset to field components

  /* Form submit action. Handle forms to:
  1. Upload videos
  2. Post comments (only if comment form)
  3. Delete comment on click Delete button form in video comments
  Then optionally navigate to relevant route.
 */
  const onSubmit = async (formData) => {
    let route; // initialize variable that will set nav location based on cta

    try {
      if (cta === "publish") {
        // Constructs a new video object to pass to api as body
        const videoBody = {
          title: formData.title,
          description: formData.description,
          image: posterImageFileName ? posterImageFileName : "image0.jpg", // set the actual uploaded filename otherwise set placeholder img
        };

        // handle form action differently if using api or not
        try {
          const postedVideo = await postVideo(videoBody);
          if (postedVideo.status === 200) {
            route = `/videos/${postedVideo.data.video.id}`; // set route to navigate to after toast notification
          }
        } catch (error) {
          console.log("Could not upload video to API", error);
        }
      }

      if (cta === "comment") {
        // Constructs a new comment object to pass to api as body
        const commentBody = {
          name: "Anonymous fan",
          comment: formData.comment,
        };

        // post comment using api
        try {
          await postComment(selectedVideoId, commentBody);
          toggleCommentChange(); //trigger comment list refresh
        } catch (error) {
          console.log("Could not submit comments to API");
        }
      }

      if (cta === "delete") {
        await deleteComment(selectedVideoId, commentId);
        try {
        } catch (error) {
          console.log("Could not delete comments using API");
        }
        toggleCommentChange(); //trigger comment list refresh

        // Check if the deleted comment was part of commentsLiked state
        setCommentLiked((prev) => {
          // Filter out the deleted comment from the array
          const updatedArray = prev.filter(
            (item) => item.commentId !== commentId
          );
          return updatedArray;
        });
      }
      // Reset form fields after successful submission
      reset();
      setResetFlag(true); // propagate reset to child field components

      notifyNav(cta, route, navigate); // show toast notification with optional route navigation
    } catch (error) {
      console.log("error submitting form", error);
    }
  };

  /* Display notification and navigate on non submit button click */
  const handleButtonClick = (label, event) => {
    event.preventDefault(); // Stop the default form submission behavior
    notifyNav(label);
  };

  /* insert form field component */
  const getFormField = (name, label, placeholder, type) => (
    <FormField
      name={name}
      label={label}
      placeholder={placeholder}
      register={register}
      required
      type={type}
      resetValue={resetFlag}
      setResetFlag={setResetFlag}
      errors={errors}
    />
  );

  //input title field only for upload page
  const VideoTitleField = getFormField(
    "title",
    "Title your video",
    "Add a title to your video",
    "input"
  );

  //textarea field only for upload page
  const VideoDescField = getFormField(
    "description",
    "Add a video description",
    "Add a description to your video",
    "textarea"
  );

  //textarea field to enter new comment
  const CommentTextField = getFormField(
    "comment",
    "Join the conversation",
    "Add a new comment",
    "textarea"
  );

  // Shared fields for upload page or comments component
  const FieldContainer = (
    <div className={`form__field-container form__field-container--${cta}`}>
      {cta === "publish" && (
        <>
          {VideoTitleField}
          {VideoDescField}
        </>
      )}
      {cta === "comment" && CommentTextField}
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

  /* only show cancel button on publish page
  show delete button on comment component */
  const BtnContainer = (
    <div className="form__cta-btn-nav">
      {SubmitBtn(cta)}
      {cta === "publish" && CancelBtn}
    </div>
  );

  /* Return different form if video upload page, or in comments component.
  Disable buttons if form submitted, 
  and show message instead of form fields after posting new comment 
  If use API disabled in state, don't show comments form or submit button
 "handleSubmit" will validate inputs before invoking "onSubmit" */
  return (
    <form
      className={`form form--${cta}`}
      id={`${cta}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      {cta === "publish" && (
        <>
          <UploadThumbnail
            FieldContainer={FieldContainer}
            onImageUploadFilename={setPosterImageFileName}
          />
          {BtnContainer}
        </>
      )}
      {cta === "comment" && (
        <>
          {FieldContainer}
          {BtnContainer}
        </>
      )}
      {cta === "delete" && BtnContainer}
    </form>
  );
}

export default Form;
