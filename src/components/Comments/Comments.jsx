import Avatar from "../Avatar/Avatar";
import Form from "../Form/Form";
import Comment from "./Comment/Comment";
import "./Comments.scss";

/* Insert a comment component for each comment for selected video */
function Comments({ selectedVideo }) {
  const commentCount = selectedVideo.comments.length;

  return (
    <section className="comments">
      <h2 className="comments__title">
        {commentCount === 0 && "No Comments"}
        {commentCount === 1 && "1 Comment"}
        {commentCount > 1 && <>{commentCount} Comments</>}
      </h2>
      <div className="comments__comment-list-form-container">
        <div className="comments__new-comment-container">
          <Avatar isLoggedIn={true} />
          <Form cta="comment" />
        </div>
        <article className="comments__list-container">
          {selectedVideo.comments?.map((comment) => (
            <Comment comment={comment} />
          ))}
        </article>
      </div>
    </section>
  );
}

export default Comments;
