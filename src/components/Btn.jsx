import "./Btn.scss";

function Btn({ label }) {
  let className = "cta";
  className += ` cta--${label}`;

  return <button className={className}>{label}</button>;
}

export default Btn;
