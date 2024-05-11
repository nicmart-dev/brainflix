import formatDate from "../../../utils/helperFunctions";
import Avatar from "../../Avatar/Avatar";
import "./Comment.scss";

function Comment({ comment }) {
  return (
    <article key={comment.id} className="comment">
      <Avatar />
      <div className="comment__txt-container">
        <div className="comment__user-name-date-container">
          <span className="comment__user-name">{comment.name}</span>
          <span className="comment__date">{formatDate(comment.timestamp)}</span>
        </div>
        <p>{comment.comment}</p>
      </div>
    </article>
  );
}

export default Comment;
