import formatDate from "../../../utils/helperFunctions";
import Avatar from "../../Avatar/Avatar";
import Form from "../../Form/Form";
import "./Comment.scss";

import likesIcon from "../../../assets/icons/likes.svg";
import { likeComment } from "../../../utils/brainflix-api";

function Comment({ comment, selectedVideoId, commentsLiked, setCommentLiked }) {
  /* Handle  like button click */
  const handleLike = (commentId) => {
    //check if video has already been liked and if not, call like api
    if (
      !commentsLiked.some(
        (comment) =>
          comment.videoId === selectedVideoId && comment.commentId === commentId
      )
    ) {
      likeComment(selectedVideoId, comment.id);
      // track this video id has been liked which also triggers grandparent component refresh
      setCommentLiked((prev) => [
        ...prev,
        { videoId: selectedVideoId, commentId: comment.id },
      ]);
    }
  };
  const deleteBtn = (
    <Form
      cta="delete"
      selectedVideoId={selectedVideoId}
      commentId={comment.id}
    />
  );

  const commentBtnContainer = (
    <div className="comment__button-container" id={comment.id}>
      <div className="comment__likes-container">
        <img
          src={likesIcon}
          alt="likes icon"
          className="comment__likes-img"
          onClick={() => handleLike(comment.id)}
        />
        <span className="comment__likes">{comment.likes}</span>
      </div>
      {deleteBtn}
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
        {commentBtnContainer}
      </div>
    </article>
  );
}

export default Comment;
