import "./VideoPlayer.scss";

function VideoPlayer() {
  return (
    <video
      className="video-player"
      src="https://unit-3-project-api-0a5620414506.herokuapp.com/stream"
      poster="https://unit-3-project-api-0a5620414506.herokuapp.com/images/image0.jpg"
      controls
    >
      Your browser does not support the video tag.
    </video>
  );
}

export default VideoPlayer;
