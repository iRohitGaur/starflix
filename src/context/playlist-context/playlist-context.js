import { useAuth } from "context/auth-context/auth-context";
import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { useAxios, useToast } from "../../utils";

const PlaylistContext = createContext();

const usePlaylist = () => useContext(PlaylistContext);

function PlaylistProvider({ children }) {
  const { operation } = useAxios();
  const [playlists, setPlaylists] = useState([]);
  const [createNewPlaylistModal, setCreateNewPlaylistModal] = useState(false);
  const [showPlaylistsModal, setShowPlaylistsModal] = useState(false);
  const [videoToAddToPlaylist, setVideoToAddToPlaylist] = useState(null);

  const { sendToast } = useToast();
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const response = await operation({
            method: "get",
            url: "/user/playlist",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          setPlaylists(response.playlist);
        } catch (error) {
          sendToast(error, true);
          console.error(error);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const createNewPlaylistAndAddVideo = async (playlistName) => {
    try {
      const response = await operation({
        method: "post",
        url: "/user/playlist/createandaddvideo",
        data: { name: playlistName, videoId: videoToAddToPlaylist },
      });
      sendToast("playlist created");
      sendToast("video added to playlist");
      setPlaylists(response.playlist);
      setVideoToAddToPlaylist(null);
    } catch (error) {
      sendToast(error, true);
      console.error(error);
    }
  };

  const createNewPlaylist = async (playlistName) => {
    if (videoToAddToPlaylist) {
      createNewPlaylistAndAddVideo(playlistName);
    } else {
      try {
        const response = await operation({
          method: "post",
          url: "/user/playlist",
          data: { name: playlistName },
        });
        sendToast("playlist created");
        setPlaylists(response.playlist);
      } catch (error) {
        sendToast(error, true);
        console.error(error);
      }
    }
  };

  const toggleVideoInPlaylist = async (playlistId, videoId) => {
    try {
      const response = await operation({
        method: "put",
        url: "/user/playlist",
        data: { playlistId, videoId },
      });
      sendToast("playlist updated");
      setPlaylists(response.playlist);
    } catch (error) {
      sendToast(error, true);
      console.error(error);
    }
  };

  const deletePlaylist = async (playlistId) => {
    const url = `/user/playlist/${playlistId}`;
    try {
      const response = await operation({
        method: "delete",
        url: url,
      });
      sendToast("playlist deleted");
      setPlaylists(response.playlist);
    } catch (error) {
      sendToast(error, true);
      console.error(error);
    }
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
        toggleVideoInPlaylist,
        videoToAddToPlaylist,
        setVideoToAddToPlaylist,
        deletePlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}

export { PlaylistProvider, usePlaylist };
