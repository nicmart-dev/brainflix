import "./Btn.scss";

function Btn({ label }) {
  let className = "cta";
  className +=
    label === "upload"
      ? " cta--upload"
      : label === "comment"
      ? " cta--comment"
      : "";

  return <button className={className}>{label}</button>;
}

export default Btn;
