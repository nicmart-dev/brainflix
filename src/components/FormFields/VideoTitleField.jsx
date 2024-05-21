import React from "react";
import FormField from "../FormField/FormField";

/* input title field only for upload page */
const VideoTitleField = ({ register, resetFlag, setResetFlag, errors }) => (
  <FormField
    name="title"
    label="Title your video"
    placeholder="Add a title to your video"
    register={register}
    required
    type="input"
    resetValue={resetFlag}
    setResetFlag={setResetFlag}
    errors={errors}
  />
);

export default VideoTitleField;
