import "./VideoDetails.scss";

import viewsIcon from "../../assets/icons/views.svg";
import likesIcon from "../../assets/icons/likes.svg";

function VideoDetails() {
  return (
    <article className="video-details">
      <h1>The Future of Artificial Intelligence</h1>
      <div className="video-details__metadata-container">
        <div className="video-details__channel-container">
          <span className="video-details__channel">By Aiden Thompson</span>
          <span className="video-details__date">8/8/2023</span>
        </div>
        <div className="video-details__stats-container">
          <div>
            <img src={viewsIcon} alt="views icon" />
            <span className="video-details__views">980,544</span>
          </div>
          <div>
            <img src={likesIcon} alt="likes icon" />
            <span className="video-details__likes">22,479</span>
          </div>
        </div>
      </div>
      <p className="video-details__description">
        Explore the cutting-edge developments and predictions for Artificial
        Intelligence in the coming years. From revolutionary breakthroughs in
        machine learning to the ethical considerations influencing AI
        advancements, this exploration transcends the boundaries of mere
        speculation. Join us on a journey that navigates the intricate interplay
        between innovation, ethics, and the ever-evolving tech frontier.
      </p>
    </article>
  );
}

export default VideoDetails;
