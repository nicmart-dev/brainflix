import "./NextVideos.scss";
import { Link } from "react-router-dom";

function NextVideos({ videoList, selectedVideoId }) {
  return (
    <section className="next-videos">
      <h2 className="next-videos__header">NEXT VIDEOS</h2>
      <ul className="next-videos__video-list">
        {videoList
          .filter((video) => video.id !== selectedVideoId)
          .map((video) => (
            <li key={video.id} className="next-videos__video-list-item">
              {/* Go to top of page after navigating to new video */}
              <Link
                to={`/videos/${video.id}`}
                onClick={() => window.scrollTo(0, 0)}
                className="next-videos__video-link"
              >
                <img
                  className="next-videos__video-thumbnail"
                  src={video.image}
                  alt={video.title}
                />
              </Link>

              <div className="next-videos__video-info">
                <span className="next-videos__video-title">{video.title}</span>
                <span>{video.channel}</span>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
}

export default NextVideos;
