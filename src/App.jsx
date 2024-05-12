import SiteHeader from "./components/SiteHeader/SiteHeader";
import VideoPage from "./pages/VideoPage/VideoPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import UploadPage from "./pages/UploadPage/UploadPage";

import { useState } from "react"; // Import to then store video in state

import { APIProvider } from "./context/apiContext"; // set as context to access globally

import { ToastContainer } from "react-toastify"; // import at top level of component tree to avoid duplicate rendering issues for https://www.npmjs.com/package/react-toastify */

function App() {
  /* Initialize the list of video IDs for which a comment was posted
  at parent level so it persists when navigating between video page and upload page */
  const [commentPostedVideoIds, setCommentPostedVideoIds] = useState([]);

  /* Initialize use API feature flag at parent level, to  */

  return (
    <APIProvider>
      <BrowserRouter>
        <SiteHeader />
        <Routes>
          <Route
            path="/"
            element={
              <VideoPage
                commentPostedVideoIds={commentPostedVideoIds}
                setCommentPostedVideoIds={setCommentPostedVideoIds}
              />
            }
          />
          <Route
            path="/videos/:videoId"
            element={
              <VideoPage
                commentPostedVideoIds={commentPostedVideoIds}
                setCommentPostedVideoIds={setCommentPostedVideoIds}
              />
            }
          />
          <Route path="/upload" element={<UploadPage />} />

          {/* The 404 error page displays paths that don’t exist on the website. 
        So, instead of specifying the path, use an asterisk (*) to match anything. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </APIProvider>
  );
}

export default App;
