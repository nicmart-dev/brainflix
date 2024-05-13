import "./VideoPage.scss";

// Import page components
import Comments from "../../components/Comments/Comments";
import NextVideos from "../../components/NextVideos/NextVideos";
import VideoDetails from "../../components/VideoDetails/VideoDetails";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";

import { useState, useEffect } from "react"; // Import to then store video in state
import { useParams, Navigate } from "react-router-dom";

import {
  getVideos,
  getVideoDetails,
  getStaticData,
  getStaticDetailsData,
} from "../../utils/brainflix-api";

import { useAPIContext } from "../../context/apiContext";
import { useCommentContext } from "../../context/commentContext"; // set as context to access globally

const VideoPage = () => {
  const { videoId } = useParams();
  const { useAPI, setUseAPI } = useAPIContext();
  const { commentIdDeleted, commentPostedVideoIds } = useCommentContext();

  /* initialize the main video and list of video states unconditionally, and then update it as needed 
  based on the condition, using useEffect hook */
  const [videos, setVideos] = useState([]);
  const [mainVideo, setMainVideo] = useState(null);

  /* using state to navigate to notfound page with useEffect hook */
  const [notFound, setNotFound] = useState(false);

  /*  show video list on initial page load */
  useEffect(() => {
    async function fetchVideos() {
      // get videos from api and fallback to using static data if api error or if useAPI flag set to false */

      let videosData;

      if (useAPI) {
        try {
          videosData = await getVideos(); // try to get videos by api
        } catch (error) {
          console.log(
            "Could not get video list from BrainFlix API, importing static data instead."
          );
          // If api failure, fallback to importing from json files.
          videosData = await getStaticData();
          setUseAPI(false);
        }
      } else videosData = await getStaticData();

      setVideos(videosData); //display in side videos
    }

    fetchVideos();
  }, [setUseAPI, useAPI]);

  /*  update main video and its details each time:
  1. videoId changes,  
  2. set to first video as soon as video list is loaded or when clicking on header logo 
  3. a new comment is posted */
  useEffect(() => {
    async function fetchVideoDetails() {
      // Set main video if videoId is set
      if (videoId) {
        // get details of a specific video from api and fallback to using static data if api error or if useAPI flag set to false
        if (useAPI) {
          try {
          } catch (error) {
            console.log(
              "Could not get video details from BrainFlix API, importing static data instead."
            );
            getStaticDetailsData(videoId);
            setUseAPI(false);
          }
          const videoDetails = await getVideoDetails(videoId);

          if (videoDetails) {
            setMainVideo(videoDetails);
          } else {
            setNotFound(true); // If video not found, set notFound state to true
          }
        } else getStaticDetailsData(videoId); // else try to get static data without using api
      } else if (videos && videos.length > 0) {
        // set main video to first video, but only when videos have been loaded
        const firstVideoDetails = await getVideoDetails(videos[0].id);
        setMainVideo(firstVideoDetails); // reset video when clicking on logo while on video page
      }
    }
    fetchVideoDetails();
  }, [
    videoId,
    videos,
    commentPostedVideoIds,
    useAPI,
    setUseAPI,
    commentIdDeleted,
  ]);

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
