import { Routes, Route } from "react-router-dom";
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
  Playlist,
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

        <Route element={<PrivateRoute />}>
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/likedvideos" element={<LikedVideos />} />
          <Route path="/watchlater" element={<WatchLater />} />
          <Route path="/history" element={<History />} />
        </Route>

        <Route element={<RestrictedRoute />}>
          <Route path="/auth" element={<Auth />} />
        </Route>
      </Routes>

      <CreateNewPlaylist />
      <AddVideoToPlaylist />
    </>
  );
}

export default App;
