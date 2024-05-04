import formatDate from "../../utils/helperFunctions";
import Avatar from "../Avatar";
import Btn from "../Btn";
import "./Comments.scss";

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
          <form className="comments__form" id="new-comment-form">
            <div className="comments__new-comment-txt_container">
              <label
                htmlFor="new-comment-txt"
                className="comments__new-comment-label"
              >
                Join the conversation
              </label>
              <textarea
                id="new-comment-txt"
                name="comment"
                className="comments__new-comment-txt"
                required
                placeholder="Add a new comment"
              ></textarea>
            </div>
            <div className="comments__new-btn-container">
              <Btn label="comment" />
            </div>
          </form>
        </div>
        <article className="comments__list-container">
          {/* We will insert each comment inside using JavaScript. */}

          {selectedVideo.comments?.map((comment) => (
            <article key={comment.id} className="comments__comment-container">
              <Avatar />
              <div className="comments__comment-txt-container">
                <div className="comments__user-name-date-container">
                  <span className="comments__user-name">{comment.name}</span>
                  <span className="comments__date">
                    {formatDate(comment.timestamp)}
                  </span>
                </div>
                <p className="comments__comment-txt">{comment.comment}</p>
              </div>
            </article>
          ))}
        </article>
      </div>
    </section>
  );
}

export default Comments;
