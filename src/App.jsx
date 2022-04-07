import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AddVideoToPlaylist,
  CreateNewPlaylist,
  Nav,
  PrivateRoute,
  RestrictedRoute,
  Sidebar,
} from "components";
import {
  Auth,
  Explore,
  History,
  Home,
  LikedVideos,
  Page404,
  Playlist,
  Profile,
  Video,
  WatchLater,
} from "pages";

function App() {
  return (
    <>
      <Nav />
      <Sidebar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/video/:videoId" element={<Video />} />
        <Route path="*" element={<Page404 />} />

        <Route element={<PrivateRoute />}>
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/likedvideos" element={<LikedVideos />} />
          <Route path="/watchlater" element={<WatchLater />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route element={<RestrictedRoute />}>
          <Route path="/auth" element={<Auth />} />
        </Route>
      </Routes>

      <CreateNewPlaylist />
      <AddVideoToPlaylist />
      <ToastContainer />
    </>
  );
}

export default App;
