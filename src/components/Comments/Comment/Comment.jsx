import formatDate from "../../../utils/helperFunctions";
import Avatar from "../../Avatar/Avatar";
import Btn from "../../Btn/Btn";
import "./Comment.scss";

import likesIcon from "../../../assets/icons/likes.svg";

function Comment({ comment }) {
  return (
    <article key={comment.id} className="comment">
      <Avatar />
      <div className="comment__container">
        <div className="comment__user-name-date-container">
          <span className="comment__user-name">{comment.name}</span>
          <span className="comment__date">{formatDate(comment.timestamp)}</span>
        </div>
        <p>{comment.comment}</p>
        <div class="comment__button-container" id={comment.id}>
          <div className="comment__likes-container">
            <img
              src={likesIcon}
              alt="likes icon"
              className="comment__likes-img"
            />
            <span className="comment__likes">{comment.likes}</span>
          </div>
          <Btn
            label="delete"
            // onClick={(event) => handleButtonClick("cancel", event)}
          />
        </div>
      </div>
    </article>
  );
}

export default Comment;
