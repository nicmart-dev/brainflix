import React from "react";
import FormField from "../FormField/FormField";

/* input title field only for upload page */
const SiteHeaderSearchField = ({
  register,
  resetFlag,
  setResetFlag,
  errors,
}) => (
  <FormField
    name="query"
    label=""
    placeholder="Search"
    register={register}
    type="input"
    resetValue={resetFlag}
    setResetFlag={setResetFlag}
    errors={errors}
  />
);

export default SiteHeaderSearchField;
