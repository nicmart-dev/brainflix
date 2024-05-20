import "./FormField.scss";
import { useState, useEffect } from "react";

/* Create a single field of type input of textarea to be used by parent form component,
and stores this as controlled component using https://react-hook-form.com/docs/usecontroller/controller
*/
function FormField({
  name,
  label,
  placeholder,
  register,
  required,
  type,
  resetValue,
  setResetFlag,
  errors,
}) {
  const [value, setValue] = useState(""); // storing field value in state

  // Reset field value after reset() invoked in parent form
  useEffect(() => {
    if (resetValue) {
      setValue("");
    }
  }, [resetValue]);

  const InputComponent = type === "textarea" ? "textarea" : "input";

  // Determine if there's an error for the current field
  const hasError = errors && errors[name];

  /* register input into the hook by invoking the "register" function
 include validation with required standard HTML validation rules */
  return (
    <label className={`form-field__container form-field__container--${name}`}>
      {label}
      <InputComponent
        {...register(name, { required: required, pattern: /\S+/ })} //can't be empty and at least 1 non space char
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value); //set field value from state as user types
          setResetFlag(false); // allow to reset again to submit multiple comments
        }}
        value={value}
        className={`form-field--${name} ${hasError ? "form-field--error" : ""}`}
      />
      {hasError &&
        errors[name].type === "required" && ( // Check for errors and display error message
          <span role="alert" className="form-field__alert">
            This is required
          </span>
        )}
      {hasError &&
        errors[name].type === "pattern" && ( // Check for errors and display error message
          <span role="alert" className="form-field__alert">
            Please enter at least one character
          </span>
        )}
    </label>
  );
}

export default FormField;
