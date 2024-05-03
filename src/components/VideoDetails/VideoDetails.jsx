import "./VideoDetails.scss";

import viewsIcon from "../../assets/icons/views.svg";
import likesIcon from "../../assets/icons/likes.svg";

function VideoDetails() {
  return (
    <article className="video-details">
      <h1 className="video-details__title">
        The Future of Artificial Intelligence
      </h1>
      <div className="video-details__metadata-container">
        <h2 className="video-details__channel">By Aiden Thompson</h2>
        <div>
          <img src={viewsIcon} alt="views icon" />
          <span className="video-details__views">980,544</span>
        </div>
        <span className="video-details__date">8/8/2023</span>

        <div>
          <img src={likesIcon} alt="likes icon" />
          <span className="video-details__likes">22,479</span>
        </div>
      </div>
    </article>
  );
}

export default VideoDetails;
