import { useAuth } from "context/auth-context/auth-context";
import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { useAxios, useToast } from "../../utils";

const PlaylistContext = createContext();

const usePlaylist = () => useContext(PlaylistContext);

function PlaylistProvider({ children }) {
  const { response, operation } = useAxios();
  const [playlists, setPlaylists] = useState([]);
  const [createNewPlaylistModal, setCreateNewPlaylistModal] = useState(false);
  const [showPlaylistsModal, setShowPlaylistsModal] = useState(false);
  const [videoToAddToPlaylist, setVideoToAddToPlaylist] = useState(null);

  const { token } = useAuth();
  const { sendToast } = useToast();

  useEffect(() => {
    if (response && response.playlists) {
      if (response.playlists.length > playlists.length) {
        sendToast("Playlist created");
      } else {
        sendToast("Playlist deleted", true);
      }

      if (videoToAddToPlaylist) {
        addVideoToPlaylist(
          response.playlists[response.playlists.length - 1]._id,
          videoToAddToPlaylist
        );
      }
      setCreateNewPlaylistModal(false);
      setPlaylists(response.playlists);
    }
    if (response && response.playlist) {
      const plist = playlists.find((p) => p._id === response.playlist._id);
      if (response.playlist.videos.length > plist.videos.length) {
        sendToast("Video added to your playlist");
      } else {
        sendToast("Video removed from your playlist", true);
      }

      setPlaylists((playlist) =>
        playlist.map((p) =>
          p._id === response.playlist._id ? response.playlist : p
        )
      );
      setShowPlaylistsModal(false);
      setVideoToAddToPlaylist(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const createNewPlaylist = (playlist) => {
    operation({
      method: "post",
      url: "/api/user/playlists",
      headers: { authorization: token },
      data: { playlist: playlist },
    });
  };

  const addVideoToPlaylist = (playlistId, video) => {
    const url = `/api/user/playlists/${playlistId}`;
    operation({
      method: "post",
      url: url,
      headers: { authorization: token },
      data: { video },
    });
  };

  const removeVideoFromPlaylist = (playlistId, videoId) => {
    const url = `/api/user/playlists/${playlistId}/${videoId}`;
    operation({
      method: "delete",
      url: url,
      headers: { authorization: token },
    });
  };

  const deletePlaylist = (playlistId) => {
    const url = `/api/user/playlists/${playlistId}`;
    operation({
      method: "delete",
      url: url,
      headers: { authorization: token },
    });
  };

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        createNewPlaylist,
        createNewPlaylistModal,
        setCreateNewPlaylistModal,
        showPlaylistsModal,
        setShowPlaylistsModal,
        addVideoToPlaylist,
        videoToAddToPlaylist,
        setVideoToAddToPlaylist,
        removeVideoFromPlaylist,
        deletePlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}

export { PlaylistProvider, usePlaylist };
