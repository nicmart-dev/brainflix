import "./VideoDetails.scss";
import formatDate from "../../utils/helperFunctions";

//Import video player icons to display
import viewsIcon from "../../assets/icons/views.svg";
import likesIcon from "../../assets/icons/likes.svg";

function VideoDetails({ selectedVideo }) {
  return (
    <article className="video-details">
      <h1>{selectedVideo.title}</h1>
      <div className="video-details__metadata-container">
        <div className="video-details__channel-container">
          <span className="video-details__channel">
            {selectedVideo.channel}
          </span>
          <span className="video-details__date">
            {formatDate(selectedVideo.timestamp)}
          </span>
        </div>
        <div className="video-details__stats-container">
          <div>
            <img src={viewsIcon} alt="views icon" />
            <span className="video-details__views">{selectedVideo.views}</span>
          </div>
          <div>
            <img src={likesIcon} alt="likes icon" />
            <span className="video-details__likes">{selectedVideo.likes}</span>
          </div>
        </div>
      </div>
      <p className="video-details__description">{selectedVideo.description} </p>
    </article>
  );
}

export default VideoDetails;
