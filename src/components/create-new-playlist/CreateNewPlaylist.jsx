import {
  IcOutlineClose,
  MdiTextBoxCheckOutline,
  MdiTextBoxRemoveOutline,
} from "assets/Icons";
import { usePlaylist } from "context";
import React, { useState } from "react";
import "./create-new-playlist.css";

function CreateNewPlaylist({ show }) {
  const initialState = { title: "", description: "" };
  const [playlist, setPlaylist] = useState(initialState);

  const {
    createNewPlaylist,
    createNewPlaylistModal,
    setCreateNewPlaylistModal,
  } = usePlaylist();

  const isTitleEmpty = playlist.title.length === 0;
  const isValidTitle = playlist.title.length > 1;
  const isDescriptionEmpty = playlist.description.length === 0;
  const isValidDescription = playlist.description.length > 1;

  const isButtonClickable =
    isTitleEmpty || isDescriptionEmpty
      ? false
      : isValidTitle && isValidDescription
      ? true
      : false;

  const handleCreateNewPlaylist = () => {
    setPlaylist(initialState);
    createNewPlaylist(playlist);
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
            value={playlist.title}
            onChange={(e) =>
              setPlaylist((p) => ({ ...p, title: e.target.value }))
            }
          />
        </div>
        <div
          className={`sui_input input_req ${
            isDescriptionEmpty
              ? ""
              : isValidDescription
              ? "input_ss"
              : "input_er"
          }`}
        >
          <div className="input_desc">
            <span className="input_lbl">Description</span>
            <span className="input_info">
              {isDescriptionEmpty ? (
                ""
              ) : isValidDescription ? (
                <MdiTextBoxCheckOutline />
              ) : (
                <MdiTextBoxRemoveOutline />
              )}
            </span>
          </div>
          <input
            type="text"
            value={playlist.description}
            onChange={(e) =>
              setPlaylist((p) => ({ ...p, description: e.target.value }))
            }
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
