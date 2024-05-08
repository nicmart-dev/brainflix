import notFoundImg from "../../assets/images/404.png";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>Page Not Found</h2>
      <p>Try again!</p>
      <img src={notFoundImg} alt="404 not found" />
    </div>
  );
};

export default NotFound;
