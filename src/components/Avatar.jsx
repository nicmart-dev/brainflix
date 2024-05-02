import "./Avatar.scss";

function Avatar(props) {
  let className = "avatar__image";
  className += props.isLoggedIn ? " avatar__image--current-user" : "";

  return (
    <div className="avatar">
      <div className={className}></div>
    </div>
  );
}

export default Avatar;
