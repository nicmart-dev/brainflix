import "./VideoPlayer.scss";

function VideoPlayer({ selectedVideo }) {
  return (
    <video
      className="video-player"
      src={selectedVideo.video}
      poster={selectedVideo.image}
      controls
    >
      Your browser does not support the video tag.
    </video>
  );
}

export default VideoPlayer;
