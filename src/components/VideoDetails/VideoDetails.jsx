import "./VideoDetails.scss";
import formatDate from "../../utils/helperFunctions";

//Import video player icons to display
import viewsIcon from "../../assets/icons/views.svg";
import likesIcon from "../../assets/icons/likes.svg";

//Import function used to like videos
import { likeVideo } from "../../utils/brainflix-api";

function VideoDetails({ selectedVideo, videosLiked, setVideoLiked }) {
  /* Handle  like button click */
  const handleLike = () => {
    //check if video has already been liked and if not, call like api
    if (!videosLiked.some((video) => video.videoId === selectedVideo.id)) {
      likeVideo(selectedVideo.id);
      // track this video id has been liked which also triggers component refresh
      setVideoLiked((prev) => [...prev, { videoId: selectedVideo.id }]);
    }
  };

  return (
    <article className="video-details">
      <h1>{selectedVideo.title}</h1>
      <div className="video-details__metadata-container">
        <div className="video-details__channel-container">
          <span className="video-details__channel">
            By {selectedVideo.channel}
          </span>
          <span className="video-details__date">
            {formatDate(selectedVideo.timestamp)}
          </span>
        </div>
        <div className="video-details__stats-container">
          <div>
            <img
              src={viewsIcon}
              alt="views icon"
              className="video-details__views-img"
            />
            <span className="video-details__views">{selectedVideo.views}</span>
          </div>
          <div>
            <img
              src={likesIcon}
              alt="likes icon"
              className="video-details__likes-img"
              onClick={handleLike}
            />
            <span className="video-details__likes">{selectedVideo.likes}</span>
          </div>
        </div>
      </div>
      <p className="video-details__description">{selectedVideo.description} </p>
    </article>
  );
}

export default VideoDetails;
