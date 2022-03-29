import { IcOutlineClose, IcRoundPlaylistAdd } from "assets/Icons";
import { usePlaylist } from "context";
import React from "react";
import "./add-video-to-playlist.css";

function AddVideoToPlaylist() {
  const {
    playlists,
    addVideoToPlaylist,
    showPlaylistsModal,
    setShowPlaylistsModal,
    setCreateNewPlaylistModal,
    videoToAddToPlaylist,
  } = usePlaylist();

  const toggleCreateNewPlaylistModal = () => {
    setShowPlaylistsModal(false);
    setCreateNewPlaylistModal(true);
  };

  const handleAddVideoToPlaylist = (playlistId) => {
    addVideoToPlaylist(playlistId, videoToAddToPlaylist);
  };

  return (
    <div className={`sui_modal_wrapper ${showPlaylistsModal ? "visible" : ""}`}>
      <div className="sui_modal_container">
        <button
          className="btn_icon_fa"
          onClick={() => setShowPlaylistsModal(false)}
        >
          <IcOutlineClose />
        </button>
        <div className="sui_modal_title h3 font_weight_600">
          Add to Playlist
        </div>
        <div className="add_video_to_playlist">
          <button
            className="sui_btn create_new_playlist"
            onClick={toggleCreateNewPlaylistModal}
          >
            Create New Playlist
            <IcRoundPlaylistAdd />
          </button>
          <div className="add_btn_playlist_wrapper">
            {playlists &&
              playlists.map((p) => (
                <button
                  key={p._id}
                  className="sui_btn add_btn_playlist"
                  onClick={() => handleAddVideoToPlaylist(p._id)}
                >
                  {p.title}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddVideoToPlaylist;
