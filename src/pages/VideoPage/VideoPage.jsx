import "./VideoPage.scss";

// Import page components
import Comments from "../../components/Comments/Comments";
import NextVideos from "../../components/NextVideos/NextVideos";
import VideoDetails from "../../components/VideoDetails/VideoDetails";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";

import { useState, useEffect } from "react"; // Import to then store video in state
import { useParams, Navigate } from "react-router-dom";

import { getVideos, getVideoDetails } from "../../utils/brainflix-api";
import { useCommentContext } from "../../context/commentContext"; // set as context to access globally

const VideoPage = () => {
  const { videoId } = useParams();
  const { commentIdDeleted, commentPostedVideoIds } = useCommentContext();

  /* initialize the main video and list of video states unconditionally, and then update it as needed 
  based on the condition, using useEffect hook */
  const [videos, setVideos] = useState([]);
  const [mainVideo, setMainVideo] = useState(null);

  /* using state to navigate to notfound page with useEffect hook */
  const [notFound, setNotFound] = useState(false);

  /* state variable to track whether a given video has been liked */
  const [videosLiked, setVideoLiked] = useState([]);

  /* state variable to track whether a given video comment has been liked */
  const [commentsLiked, setCommentLiked] = useState([]);

  /*  show video list on initial page load or when navigating from upload video page */
  useEffect(() => {
    async function fetchVideos() {
      // get videos from api  */

      let videosData;

      try {
        videosData = await getVideos(); // try to get videos by api
      } catch (error) {
        console.log("Could not get video list from BrainFlix API.");
      }

      setVideos(videosData); //display in side videos
    }

    // Fetch videos only when the component mounts
    if (videos.length === 0) {
      fetchVideos();
    }
  }, [videos]);

  /*  update main video and its details each time:
  1. videoId changes,  
  2. set to first video as soon as video list is loaded or when clicking on header logo 
  3. a new comment is posted 
  4. a video has been liked */
  useEffect(() => {
    let id;
    // Set main video if videoId is set, otherwise set to first video
    if (videoId) {
      id = videoId;
    } else if (videos && videos.length > 0) {
      // set main video to first video, but only when videos have been loaded
      id = videos[0].id;
    }
    if (id) fetchVideoDetails(id);
    async function fetchVideoDetails(id) {
      let videoDetails;

      //get video details from API

      try {
        videoDetails = await getVideoDetails(id);
        //now that we  have video details, set it as main video otherwise display page not found
        setMainVideo(videoDetails);
        setNotFound(false); // reset notFound state
      } catch (error) {
        console.log("Could not get video details from BrainFlix API.");
        setNotFound(true); // set notFound state
      }
    }
  }, [
    videoId,
    videos,
    commentPostedVideoIds,
    commentIdDeleted,
    videosLiked,
    commentsLiked,
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
              <VideoDetails
                selectedVideo={mainVideo}
                videosLiked={videosLiked}
                setVideoLiked={setVideoLiked}
              />
              <Comments
                selectedVideo={mainVideo}
                commentsLiked={commentsLiked}
                setCommentLiked={setCommentLiked}
              />
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
