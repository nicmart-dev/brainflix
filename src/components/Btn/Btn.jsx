import "./Btn.scss";

/* Required dependencies to use Toast package for notification 
https://www.npmjs.com/package/react-toastify */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Btn({ label }) {
  let className = "cta";
  className += ` cta--${label}`;

  // Change message depending on button clicked using toast package.
  const notify = () => {
    let msg = "";
    let type = "info";
    switch (label) {
      case "publish":
        msg = "Upload complete";
        type = "success";
        break;
      case "cancel":
        msg = "Cancelling, going back to homepage";
        type = "info";
        break;
      case "comment":
        msg = "Comment posted!";
        type = "success";
        break;
      default:
        msg = "";
    }
    toast[type](msg);
  };

  return (
    <>
      <button className={className} onClick={notify}>
        {label}
      </button>
      <ToastContainer />
    </>
  );
}

export default Btn;
