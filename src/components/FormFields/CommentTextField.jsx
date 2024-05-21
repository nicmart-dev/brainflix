import React from "react";
import FormField from "../FormField/FormField";

/* textarea field to enter new comment */
const CommentTextField = ({ register, resetFlag, setResetFlag, errors }) => (
  <FormField
    name="comment"
    label="Join the conversation"
    placeholder="Add a new comment"
    register={register}
    required
    type="textarea"
    resetValue={resetFlag}
    setResetFlag={setResetFlag}
    errors={errors}
  />
);

export default CommentTextField;
