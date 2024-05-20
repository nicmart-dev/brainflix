import "./VideoPlayer.scss";

function VideoPlayer({ selectedVideo }) {
  // Generate a unique key based on the selected video ID
  const videoKey = selectedVideo ? selectedVideo.id : "no-video";
  return (
    <video
      key={videoKey}
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
