import "./VideoPlayer.scss";

//Import video player control images
import playIcon from "../../assets/icons/play.svg";
import pauseIcon from "../../assets/icons/pause.svg";
import soundIcon from "../../assets/icons/volume_up.svg";
import fullscreenIcon from "../../assets/icons/fullscreen.svg";

function VideoPlayer({ selectedVideo }) {
  // Generate a unique key based on the selected video ID
  const videoKey = selectedVideo ? selectedVideo.id : "no-video";
  return (
    <div className="video-player">
      <video
        className="video-player__video"
        key={videoKey}
        poster={selectedVideo.image}
        type="video/mp4"
      >
        Your browser does not support the video tag.
      </video>
      <div className="video-player__controls">
        <div className="video-player__control-container video-player__play-container">
          <button className="video-player__play-button video-player__control-button">
            <img src={playIcon} alt="play button icon" />
          </button>
        </div>
        <div className="video-player__control-container video-player__timeline-container">
          <input
            type="range"
            min="0"
            max="100"
            className="video-player__timeline"
            value="0"
          />
          {/* Replace placeholder time using JS */}
          <span className="video-player__time">0:00 / 4:01</span>
        </div>
        <div className="video-player__control-container video-player__fullscreen-vol-container">
          <button className="video-player__control-button video-player__fullscreen-button">
            <img src={fullscreenIcon} alt="fullscreen icon" />
          </button>
          <button className="video-player__sound-button video-player__control-button">
            <img src={soundIcon} alt="volume icon" />
          </button>
        </div>
      </div>
      <source src={selectedVideo.video} type="video/mp4" />
    </div>
  );
}

export default VideoPlayer;
