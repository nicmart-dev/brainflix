import "./VideoPage.scss";

// Import page components
import Comments from "../../components/Comments/Comments";
import NextVideos from "../../components/NextVideos/NextVideos";
import VideoDetails from "../../components/VideoDetails/VideoDetails";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";

import { useState, useEffect } from "react"; // Import to then store video in state
import { useParams, Navigate } from "react-router-dom";

import { getVideos, getVideoDetails } from "../../utils/brainflix-api";

const VideoPage = () => {
  const { videoId } = useParams();

  /* initialize the main video and list of video states unconditionally, and then update it as needed 
  based on the condition, using useEffect hook */
  const [videos, setVideos] = useState([]);
  const [mainVideo, setMainVideo] = useState(null);

  /* using state to navigate to notfound page with useEffect hook */
  const [notFound, setNotFound] = useState(false);

  /*  show video list on initial page load */
  useEffect(() => {
    async function fetchVideos() {
      const videosData = await getVideos(); // get list of videos to then display in side videos
      setVideos(videosData);
    }

    fetchVideos();
  }, []);

  /*  update main video each time videoId changes or set to first video 
  as soon as video list is loaded or when clicking on header logo */
  useEffect(() => {
    async function fetchVideoDetails() {
      // Set main video if videoId is set
      if (videoId) {
        const videoDetails = await getVideoDetails(videoId);

        if (videoDetails) {
          setMainVideo(videoDetails);
        } else {
          setNotFound(true); // If video not found, set notFound state to true
        }
      } else if (videos && videos.length > 0) {
        // set main video to first video, but only when videos have been loaded
        const firstVideoDetails = await getVideoDetails(videos[0].id);
        setMainVideo(firstVideoDetails); // reset video when clicking on logo while on video page
      }
    }
    fetchVideoDetails();
  }, [videoId, videos]);

  // Render the main video or redirect to NotFound page if not found
  if (notFound) {
    return <Navigate to="/video-not-found" />;
  }

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
