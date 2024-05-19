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
}) {
  const [value, setValue] = useState(""); // storing field value in state

  // Reset field value after reset() invoked in parent form
  useEffect(() => {
    if (resetValue) {
      setValue("");
    }
  }, [resetValue]);

  const InputComponent = type === "textarea" ? "textarea" : "input";

  /* register input into the hook by invoking the "register" function
 include validation with required standard HTML validation rules */
  return (
    <label className={`form-field__container form-field__container--${name}`}>
      {label}
      <InputComponent
        {...register(name, { required: required })}
        placeholder={placeholder}
        required={required}
        onChange={(e) => {
          setValue(e.target.value); //set field value from state as user types
          setResetFlag(false); // allow to reset again to submit multiple comments
        }}
        value={value}
        className={`form-field--${name}`}
      />
    </label>
  );
}

export default FormField;
