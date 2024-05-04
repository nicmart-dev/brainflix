import { useState } from "react";
import "./App.scss";
import Comments from "./components/Comments/Comments";
import NextVideos from "./components/NextVideos/NextVideos";
import SiteHeader from "./components/SiteHeader/SiteHeader";
import VideoDetails from "./components/VideoDetails/VideoDetails";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";

import videoData from "./data/video-details.json";

function App() {
  const [videos, setVideo] = useState(videoData);
  const [selectedVideo, setSelectedVideo] = useState({});

  const handleVideoClick = (id) => {
    console.log(id);
    console.log("video clicked");

    //look for matching video
    const foundVideo = videos.find((video) => video.id === id);
    console.log(foundVideo);

    // set found video to currently selected in state
    setSelectedVideo(foundVideo);
  };

  return (
    <div className="App">
      <SiteHeader />
      <main>
        <VideoPlayer />
        <section className="App__post-video-container">
          <div className="App__video-comments-container">
            <VideoDetails
              videoList={videos}
              selectedVideoId={selectedVideo.id}
            />
            <Comments />
          </div>
          <aside className="App__next-videos-container">
            <NextVideos
              videoList={videos}
              selectedVideoId={selectedVideo.id}
              handleVideoClick={handleVideoClick}
            />
          </aside>
        </section>
      </main>
    </div>
  );
}

export default App;
