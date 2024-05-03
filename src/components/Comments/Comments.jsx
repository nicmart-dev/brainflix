import Avatar from "../Avatar";
import Btn from "../Btn";
import "./Comments.scss";

function Comments() {
  return (
    <section class="comments">
      <h2 class="comments__title">3 Comments</h2>
      <div class="comments__comment-list-form-container">
        <div class="comments__new-comment-container">
          <Avatar isLoggedIn={true} />
          <form class="comments__form" id="new-comment-form">
            <div>
              <label
                for="new-comment-txt"
                className="comments__new-comment-label"
              >
                Join the conversation
              </label>
              <textarea
                id="new-comment-txt"
                name="comment"
                class="comments__new-comment-txt"
                required
                placeholder="Add a new comment"
              ></textarea>
            </div>
            <div className="comments__new-btn-container">
              <Btn label="comment" />
            </div>
          </form>
        </div>
        <article class="comments__list-container">
          {/* We will insert each comment inside using JavaScript. */}
          <article class="comments__comment-container">
            <Avatar />
            <div class="comments__comment-txt-container">
              <div class="comments__user-name-date-container">
                <span class="comments__user-name">Victor Pinto</span>
                <span class="comments__date">2/16/2021</span>
              </div>
              <p class="comments__comment-txt">
                This is art. This is inexplicable magic expressed in the purest
                way, everything that makes up this majestic work deserves
                reverence. Let us appreciate this for what it is and what it
                contains.
              </p>
            </div>
          </article>
          <article class="comments__comment-container">
            <Avatar />
            <div class="comments__comment-txt-container">
              <div class="comments__user-name-date-container">
                <span class="comments__user-name">Christina Cabrera</span>
                <span class="comments__date">1/8/2021</span>
              </div>
              <p class="comments__comment-txt">
                I feel blessed to have seen them in person. What a show! They
                were just perfection. If there was one day of my life I could
                relive, this would be it. What an incredible day.
              </p>
            </div>
          </article>
          <article class="comments__comment-container">
            <Avatar />
            <div class="comments__comment-txt-container">
              <div class="comments__user-name-date-container">
                <span class="comments__user-name">Isaac Tadesse</span>
                <span class="comments__date">12/19/2020</span>
              </div>
              <p class="comments__comment-txt">
                I can't stop listening. Every time I hear one of their songs -
                the vocals - it gives me goosebumps. Shivers straight down my
                spine. What a beautiful expression of creativity. Can't get
                enough.
              </p>
            </div>
          </article>
        </article>
      </div>
    </section>
  );
}

export default Comments;
