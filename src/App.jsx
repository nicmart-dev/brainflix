import { useState } from "react";
import "./App.scss";
import Comments from "./components/Comments/Comments";
import NextVideos from "./components/NextVideos/NextVideos";
import SiteHeader from "./components/SiteHeader/SiteHeader";
import VideoDetails from "./components/VideoDetails/VideoDetails";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";

import videoData from "./data/videos.json"; // import small amount of data to display next videos
import videoDetailsData from "./data/video-details.json"; // import all details for main video

import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";

function App() {
  //set list of videos with small amount of data to display next videos
  const [videos] = useState(videoData);

  //display at page load first video to match mockup, pulling details
  const [mainVideo, setMainVideo] = useState(videoDetailsData[0]);

  const handleVideoClick = (id) => {
    //pull relevant video object with full details
    const foundVideo = videoDetailsData.find((video) => video.id === id);

    // set found video to currently selected in state
    setMainVideo(foundVideo);
  };

  return (
    <div className="App">
      <SiteHeader />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <VideoPlayer selectedVideo={mainVideo} />
                <section className="App__post-video-container">
                  <div className="App__video-comments-container">
                    <VideoDetails selectedVideo={mainVideo} />
                    <Comments selectedVideo={mainVideo} />
                  </div>
                  <aside className="App__next-videos-container">
                    <NextVideos
                      videoList={videos}
                      selectedVideoId={mainVideo.id}
                      handleVideoClick={handleVideoClick}
                    />
                  </aside>
                </section>
              </main>
            }
          />
          {/* The 404 error page displays paths that don’t exist on the website. 
        So, instead of specifying the path, use an asterisk (*) to match anything. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
