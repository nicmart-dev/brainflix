import "./VideoPage.scss";

// Import page components
import Comments from "../../components/Comments/Comments";
import NextVideos from "../../components/NextVideos/NextVideos";
import VideoDetails from "../../components/VideoDetails/VideoDetails";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";

// Import video data
import videoData from "../../data/videos.json"; // import small amount of data to display next videos
import videoDetailsData from "../../data/video-details.json"; // import all details for main video

import { useState, useEffect } from "react"; // Import to then store video in state
import { useParams, Navigate } from "react-router-dom";

const VideoPage = () => {
  const [videos] = useState(videoData);
  const { videoId } = useParams();

  /* initialize the video state unconditionally, and then update it as needed 
  based on the condition, using useEffect hook */
  const [mainVideo, setMainVideo] = useState(null);

  /*  set main video on first load */
  useEffect(() => {
    // If videoId not provided, set main video to the first video in the list
    setMainVideo(videoDetailsData[0]);
  }, []);

  /*  update main video each time videoId changes */
  useEffect(() => {
    // Set main video if videoId is provided
    if (videoId) {
      const foundVideo = videoDetailsData.find((video) => video.id === videoId);
      if (foundVideo) {
        setMainVideo(foundVideo);
      } else {
        // If video not found, navigate to NotFound page
        return <Navigate to="/404" />;
      }
    }
  }, [videoId]);

  return (
    <main>
      {/* only render components if mainVideo is set to avoid errors */}
      {mainVideo && (
        <>
          <VideoPlayer selectedVideo={mainVideo} />
          <section className="video-page__post-video-container">
            <div className="video-page__video-comments-container">
              <VideoDetails selectedVideo={mainVideo} />
              <Comments selectedVideo={mainVideo} />
            </div>
            <aside className="video-page__next-videos-container">
              <NextVideos videoList={videos} selectedVideoId={mainVideo.id} />
            </aside>
          </section>
        </>
      )}
    </main>
  );
};

export default VideoPage;
