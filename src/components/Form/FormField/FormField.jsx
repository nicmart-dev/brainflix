import { useController } from "react-hook-form";
import { useState } from "react";
import "./FormField.scss";

function FormField({ name, label, placeholder, control, required, type }) {
  const { field } = useController({ name, control, rules: { required } });
  const [value, setValue] = useState(field.value);

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
