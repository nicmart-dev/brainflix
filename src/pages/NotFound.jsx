import notFoundImg from "../assets/images/404.png";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <>
      <h2>Page Not Found</h2>
      <p>Try again!</p>
      <img src={notFoundImg} alt="404 not found" />
    </>
  );
};

export default NotFound;
