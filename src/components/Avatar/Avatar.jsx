import "./Avatar.scss";

function Avatar({ isLoggedIn }) {
  let className = "avatar__image";
  className += isLoggedIn ? " avatar__image--current-user" : "";

  return (
    <div className="avatar">
      <div className={className}></div>
    </div>
  );
}

export default Avatar;
