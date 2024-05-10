import { useController } from "react-hook-form";
import { useState } from "react";
import "./FormField.scss";

/* Create a single field of type input of textarea to be used by parent form component,
and stores this as controlled component using https://react-hook-form.com/docs/usecontroller/controller
*/
function FormField({ name, label, placeholder, control, required, type }) {
  const { field } = useController({ name, control, rules: { required } });
  const [value, setValue] = useState(field.value); // storing field value in state

  const InputComponent = type === "textarea" ? "textarea" : "input";

  return (
    <label className="form-field__container">
      {label}
      <InputComponent
        {...field}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          field.onChange(e.target.value); // send data to hook form
          setValue(e.target.value);
        }}
        required={required}
      />
    </label>
  );
}

export default FormField;
