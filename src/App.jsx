import "./App.scss";

import SiteHeader from "./components/SiteHeader/SiteHeader";
import VideoPage from "./pages/VideoPage/VideoPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import UploadPage from "./pages/UploadPage/UploadPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <SiteHeader />
        <Routes>
          <Route path="/" element={<VideoPage />} />
          <Route path="/videos/:videoId" element={<VideoPage />} />
          <Route path="/upload" element={<UploadPage />} />

          {/* The 404 error page displays paths that don’t exist on the website. 
        So, instead of specifying the path, use an asterisk (*) to match anything. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
