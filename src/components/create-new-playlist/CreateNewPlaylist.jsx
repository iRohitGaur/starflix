import {
  IcOutlineClose,
  MdiTextBoxCheckOutline,
  MdiTextBoxRemoveOutline,
} from "assets/Icons";
import { usePlaylist } from "context";
import React, { useState } from "react";
import "./create-new-playlist.css";

function CreateNewPlaylist({ show }) {
  const [playlistName, setPlaylistName] = useState("");

  const {
    createNewPlaylist,
    createNewPlaylistModal,
    setCreateNewPlaylistModal,
  } = usePlaylist();

  const isTitleEmpty = playlistName.length === 0;
  const isValidTitle = playlistName.length > 1;

  const isButtonClickable = !isTitleEmpty && isValidTitle ? true : false;

  const handleCreateNewPlaylist = () => {
    setPlaylistName("");
    createNewPlaylist(playlistName);
    setCreateNewPlaylistModal(false);
  };

  return (
    <div
      className={`sui_modal_wrapper ${createNewPlaylistModal ? "visible" : ""}`}
    >
      <div className="sui_modal_container">
        <button
          className="btn_icon_fa"
          onClick={() => setCreateNewPlaylistModal(false)}
        >
          <IcOutlineClose />
        </button>
        <div className="sui_modal_title h3 font_weight_600">
          Create New Playlist
        </div>
        <div
          className={`sui_input input_req ${
            isTitleEmpty ? "" : isValidTitle ? "input_ss" : "input_er"
          }`}
        >
          <div className="input_desc">
            <span className="input_lbl">Title</span>
            <span className="input_info">
              {isTitleEmpty ? (
                ""
              ) : isValidTitle ? (
                <MdiTextBoxCheckOutline />
              ) : (
                <MdiTextBoxRemoveOutline />
              )}
            </span>
          </div>
          <input
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />
        </div>
        <button
          className={`sui_btn ${isButtonClickable ? "" : "btn_disabled"}`}
          disabled={!isButtonClickable}
          onClick={handleCreateNewPlaylist}
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default CreateNewPlaylist;
