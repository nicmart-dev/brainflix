import "./App.scss";
import SiteHeader from "./components/SiteHeader/SiteHeader";
import VideoDetails from "./components/VideoDetails/VideoDetails";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";

function App() {
  return (
    <div className="App">
      <SiteHeader />
      <main>
        <VideoPlayer />
        <VideoDetails />
        <section>{/* Insert Comments component */}</section>
      </main>
      <aside>{/* Insert Next videos component */}</aside>
    </div>
  );
}

export default App;
