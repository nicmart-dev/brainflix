import "./NextVideos.scss";

function NextVideos() {
  return (
    <section className="next-videos">
      <h2 className="next-videos__header">NEXT VIDEOS</h2>
      <ul className="next-videos__video-list">
        <li className="next-videos__video-list-item">
          <a href="#" className="next-videos__video-link">
            <img
              className="next-videos__video-thumbnail"
              src="https://unit-3-project-api-0a5620414506.herokuapp.com/images/image1.jpg"
              alt="video thumbnail"
            />
          </a>
          <div className="next-videos__video-info">
            <span className="next-videos__video-title">
              Exploring Cities of Europe
            </span>
            <span>Ryan Hernandez</span>
          </div>
        </li>
        <li className="next-videos__video-list-item">
          <a href="#" className="next-videos__video-link">
            <img
              className="next-videos__video-thumbnail"
              src="https://unit-3-project-api-0a5620414506.herokuapp.com/images/image2.jpg"
              alt="video thumbnail"
            />
          </a>
          <div className="next-videos__video-info">
            <span className="next-videos__video-title">
              Molecular Gastronomy: Secrets Unveiled
            </span>
            <span>Cornelia Currey</span>
          </div>
        </li>
      </ul>
    </section>
  );
}

export default NextVideos;
