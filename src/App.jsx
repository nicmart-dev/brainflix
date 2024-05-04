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

  //set selected video to be the first one in the video state
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);

  const handleVideoClick = (id) => {
    //look for matching video
    const foundVideo = videos.find((video) => video.id === id);

    // set found video to currently selected in state
    setSelectedVideo(foundVideo);
  };

  return (
    <div className="App">
      <SiteHeader />
      <main>
        <VideoPlayer selectedVideo={selectedVideo} />
        <section className="App__post-video-container">
          <div className="App__video-comments-container">
            <VideoDetails selectedVideo={selectedVideo} />
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
