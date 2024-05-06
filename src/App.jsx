import "./App.scss";

import SiteHeader from "./components/SiteHeader/SiteHeader";
import VideoPage from "./pages/VideoPage/VideoPage";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SiteHeader />
        <Routes>
          <Route path="/videos"></Route>
          <Route path="/" element={<VideoPage />} />
          {/* The 404 error page displays paths that don’t exist on the website. 
        So, instead of specifying the path, use an asterisk (*) to match anything. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
