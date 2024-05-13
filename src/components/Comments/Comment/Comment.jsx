import formatDate from "../../../utils/helperFunctions";
import Avatar from "../../Avatar/Avatar";
import Form from "../../Form/Form";
import "./Comment.scss";

import likesIcon from "../../../assets/icons/likes.svg";

import { useAPIContext } from "../../../context/apiContext";

function Comment({ comment, selectedVideoId, setCommentIdDeleted }) {
  const { useAPI } = useAPIContext();

  const commentBtnContainer = (
    <div className="comment__button-container" id={comment.id}>
      <div className="comment__likes-container">
        <img src={likesIcon} alt="likes icon" className="comment__likes-img" />
        <span className="comment__likes">{comment.likes}</span>
      </div>
      <Form
        cta="delete"
        selectedVideoId={selectedVideoId}
        commentId={comment.id}
        setCommentIdDeleted={setCommentIdDeleted}
      />
    </div>
  );

  return (
    <article key={comment.id} className="comment">
      <Avatar />
      <div className="comment__container">
        <div className="comment__user-name-date-container">
          <span className="comment__user-name">{comment.name}</span>
          <span className="comment__date">{formatDate(comment.timestamp)}</span>
        </div>
        <p>{comment.comment}</p>
        {useAPI && commentBtnContainer}
      </div>
    </article>
  );
}

export default Comment;
