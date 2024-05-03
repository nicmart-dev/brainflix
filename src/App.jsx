import "./App.scss";
import Comments from "./components/Comments/Comments";
import SiteHeader from "./components/SiteHeader/SiteHeader";
import VideoDetails from "./components/VideoDetails/VideoDetails";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";

function App() {
  return (
    <div className="App">
      <SiteHeader />
      <main>
        <VideoPlayer />
        <section className="App__post-video-container">
          <div className="App__video-comments-container">
            <VideoDetails />
            <Comments />
          </div>
          <aside>{/* Insert Next videos component */}</aside>
        </section>
      </main>
    </div>
  );
}

export default App;
