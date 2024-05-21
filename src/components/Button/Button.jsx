import "./Button.scss";

function Button({ label, onClick, type, disabled, required }) {
  // Ensure label is provided
  if (!label) {
    throw new Error('Button component requires a "label" prop.');
  }
  let className = "cta";
  className += ` cta--${label}`;

  //Pass label to onclick function to handle different behavior
  return (
    <button
      type={type === "submit" ? "submit" : null}
      className={className}
      onClick={onClick} // if prop not provided, no onclick behavior
      disabled={disabled}
      required={required}
    >
      {label}
    </button>
  );
}

export default Button;
