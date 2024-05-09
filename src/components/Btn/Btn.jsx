import "./Btn.scss";

function Btn({ label, onClick }) {
  let className = "cta";
  className += ` cta--${label}`;

  // Do nothing if no onclick prop passed (ie. button is not part of a form)
  const handleClick = () => {
    if (onClick) {
      onClick(label);
    }
  };

  //Pass label to onclick function to handle different behavior
  return (
    <button className={className} onClick={handleClick}>
      {label}
    </button>
  );
}

export default Btn;
