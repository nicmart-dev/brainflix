import React, { useEffect, useState } from "react";
import "./VideoPlayer.scss";

// Import video player control images
import playIcon from "../../assets/icons/play.svg";
import pauseIcon from "../../assets/icons/pause.svg";
import soundIcon from "../../assets/icons/volume_up.svg";
import muteIcon from "../../assets/icons/volume_off.svg";
import fullscreenIcon from "../../assets/icons/fullscreen.svg";

function VideoPlayer({ selectedVideo }) {
  // Generate a unique key based on the selected video ID
  const videoKey = selectedVideo ? selectedVideo.id : "no-video";
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = document.getElementById("video");

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleVideoEnded = () => {
      setIsPlaying(false);
    };

    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleVideoEnded);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleVideoEnded);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handlePlayPauseClick = () => {
    const video = document.getElementById("video");
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMuteUnmuteClick = () => {
    const video = document.getElementById("video");
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleFullscreenClick = () => {
    const videoContainer = document.querySelector(".video-player");
    if (!isFullScreen) {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen().catch((error) => {
          console.error("Error attempting to enter fullscreen:", error);
        });
      } else if (videoContainer.webkitRequestFullscreen) {
        /* Safari */
        videoContainer.webkitRequestFullscreen().catch((error) => {
          console.error("Error attempting to enter fullscreen:", error);
        });
      } else if (videoContainer.msRequestFullscreen) {
        /* IE11 */
        videoContainer.msRequestFullscreen().catch((error) => {
          console.error("Error attempting to enter fullscreen:", error);
        });
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch((error) => {
          console.error("Error attempting to exit fullscreen:", error);
        });
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen().catch((error) => {
          console.error("Error attempting to exit fullscreen:", error);
        });
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen().catch((error) => {
          console.error("Error attempting to exit fullscreen:", error);
        });
      }
    }
  };

  const timelineValue = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="video-player">
      <video
        className="video-player__video"
        id="video"
        key={videoKey}
        poster={selectedVideo.image}
        type="video/mp4"
        src={selectedVideo.video}
      >
        Your browser does not support the video tag.
      </video>
      <div className="video-player__controls">
        <div className="video-player__control-container video-player__play-container">
          <button
            className="video-player__play-button video-player__control-button"
            onClick={handlePlayPauseClick}
          >
            <img
              src={isPlaying ? pauseIcon : playIcon}
              alt="play button icon"
            />
          </button>
        </div>
        <div className="video-player__control-container video-player__timeline-container">
          <input
            type="range"
            min="0"
            max="100"
            className="video-player__timeline"
            value={isNaN(timelineValue) ? "0" : timelineValue}
            onChange={(e) => {
              const video = document.getElementById("video");
              const newTime = (e.target.value / 100) * video.duration;
              video.currentTime = newTime;
              setCurrentTime(newTime);
            }}
          />
          <span className="video-player__time">
            {`${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60)
              .toString()
              .padStart(2, "0")} / ${Math.floor(duration / 60)}:${Math.floor(
              duration % 60
            )
              .toString()
              .padStart(2, "0")}`}
          </span>
        </div>
        <div className="video-player__control-container video-player__fullscreen-vol-container">
          <button
            className="video-player__control-button video-player__fullscreen-button"
            onClick={handleFullscreenClick}
          >
            <img src={fullscreenIcon} alt="fullscreen icon" />
          </button>
          <button
            className="video-player__sound-button video-player__control-button"
            onClick={handleMuteUnmuteClick}
          >
            <img src={isMuted ? muteIcon : soundIcon} alt="volume icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
