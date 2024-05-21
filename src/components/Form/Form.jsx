import { useState } from "react";
import { useForm } from "react-hook-form"; // we are using https://react-hook-form.com/

import {
  postVideo,
  postComment,
  deleteComment,
} from "../../utils/brainflix-api";
import "./Form.scss";

import UploadThumbnail from "../UploadThumbnail/UploadThumbnail"; // Image thumbnail and fields for upload page

import { notifyNav } from "../../utils/notification"; // Import the notifyNav function
import { useNavigate } from "react-router-dom"; // for the notifyNav function

/* Import all button and form fields component */
import VideoTitleField from "../FormFields/VideoTitleField";
import VideoDescField from "../FormFields/VideoDescField";
import CommentTextField from "../FormFields/CommentTextField";
import SiteHeaderSearchField from "../FormFields/SiteHeaderSearchField";

import SubmitBtn from "../Buttons/SubmitBtn";
import CancelBtn from "../Buttons/CancelBtn";

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
      if (cta === "query") {
        // Do nothing, search functionality not implemented
        formData.preventDefault();
      }
      if (cta === "publish" && !posterImageFileName) {
        // If publishing and no image is selected, prevent form submission
        alert("Please select an image.");
        return;
      }

      if (cta === "publish") {
        // Constructs a new video object to pass to api as body
        const videoBody = {
          title: formData.title,
          description: formData.description,
          image: posterImageFileName, // set the actual uploaded filename otherwise set placeholder img
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
    notifyNav(label, "", navigate);
  };

  /* Return different form if video upload page, or in comments component.
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
            FieldContainer={
              <div
                className={`form__field-container form__field-container--${cta}`}
              >
                <VideoTitleField
                  register={register}
                  resetFlag={resetFlag}
                  setResetFlag={setResetFlag}
                  errors={errors}
                />
                <VideoDescField
                  register={register}
                  resetFlag={resetFlag}
                  setResetFlag={setResetFlag}
                  errors={errors}
                />
              </div>
            }
            onImageUploadFilename={setPosterImageFileName}
          />
          <div className="form__cta-btn-nav">
            <SubmitBtn label={cta} />
            <CancelBtn handleButtonClick={handleButtonClick} />
          </div>
        </>
      )}
      {cta === "comment" && (
        <>
          <div
            className={`form__field-container form__field-container--${cta}`}
          >
            <CommentTextField
              register={register}
              resetFlag={resetFlag}
              setResetFlag={setResetFlag}
              errors={errors}
            />
          </div>
          <div className="form__cta-btn-nav">
            <SubmitBtn label={cta} />
          </div>
        </>
      )}
      {cta === "delete" && (
        <div className="form__cta-btn-nav">
          <SubmitBtn label={cta} />
        </div>
      )}
      {cta === "query" && (
        <>
          <SiteHeaderSearchField
            register={register}
            resetFlag={resetFlag}
            setResetFlag={setResetFlag}
            errors={errors}
          />
        </>
      )}
    </form>
  );
}

export default Form;
