import { IcRoundPlaylistAdd } from "assets/Icons";
import { Card } from "components";
import { usePlaylist } from "context";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./playlist.css";

function Playlist() {
  const { playlists, setCreateNewPlaylistModal, deletePlaylist } =
    usePlaylist();
  const [selectedPlaylistIndex, setSelectedPlaylistIndex] = useState(null);

  useEffect(() => {
    if (playlists) {
      if (playlists.length !== 0 && selectedPlaylistIndex === null) {
        setSelectedPlaylistIndex(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlists]);

  const handleDeletePlaylist = () => {
    setSelectedPlaylistIndex(null);
    deletePlaylist(playlists[selectedPlaylistIndex]._id);
  };

  return (
    <main className="playlist_page">
      <div className="playlist_wrapper">
        <button
          className="sui_btn create_new_playlist"
          onClick={() => setCreateNewPlaylistModal(true)}
        >
          Create New Playlist
          <IcRoundPlaylistAdd />
        </button>
        {playlists &&
          playlists.map((p, index) => (
            <button
              key={p._id}
              className={`sui_btn btn_playlist ${
                selectedPlaylistIndex !== null
                  ? playlists[selectedPlaylistIndex]._id === p._id &&
                    "selected_btn"
                  : ""
              }`}
              onClick={() => setSelectedPlaylistIndex(index)}
            >
              {p.title}
            </button>
          ))}
      </div>
      <div className="playlist_content_wrapper">
        {selectedPlaylistIndex !== null ? (
          playlists[selectedPlaylistIndex].videos.length === 0 ? (
            <div className="flex_column flex_align_center">
              <div className="playlist_empty">Playlist empty</div>
              <div>
                Add videos to this playlist from{" "}
                <Link to="/explore">Explore</Link> section
              </div>
              <button
                className="sui_btn delete_empty_playlist"
                onClick={handleDeletePlaylist}
              >
                Delete Playlist
              </button>
            </div>
          ) : (
            <div className="playlist_video_listing_wrapper">
              <div className="playlist_video_listing_title_wrapper">
                <p className="playlist_video_listing_title">
                  Videos in {playlists[selectedPlaylistIndex].title}
                </p>
                <button
                  className="sui_btn remove_playlist"
                  onClick={handleDeletePlaylist}
                >
                  Delete Playlist
                </button>
              </div>
              <div className="playlist_video_listing">
                {playlists[selectedPlaylistIndex].videos.map((video) => (
                  <Card
                    key={video._id}
                    playlistId={playlists[selectedPlaylistIndex]._id}
                    video={video}
                  />
                ))}
              </div>
            </div>
          )
        ) : (
          <div>Create Playlist to add videos</div>
        )}
      </div>
    </main>
  );
}

export default Playlist;
