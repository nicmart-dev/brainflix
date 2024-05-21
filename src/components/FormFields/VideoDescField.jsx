import React from "react";
import FormField from "../FormField/FormField";

/* textarea field only for upload page */
const VideoDescField = ({ register, resetFlag, setResetFlag, errors }) => (
  <FormField
    name="description"
    label="Add a video description"
    placeholder="Add a description to your video"
    register={register}
    required
    type="textarea"
    resetValue={resetFlag}
    setResetFlag={setResetFlag}
    errors={errors}
  />
);

export default VideoDescField;
