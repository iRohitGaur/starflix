import {
  CarbonTime,
  IcRoundPlaylistAdd,
  IcRoundPlaylistRemove,
} from "assets/Icons";
import { useAuth, usePlaylist } from "context";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./card.css";

function Card({ video, playlistId }) {
  const {
    title,
    videoLength,
    videoThumbnail,
    likes,
    views,
    channelName,
    channelThumbnail,
    channelLink,
    subscribers,
  } = video;

  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    playlists,
    setCreateNewPlaylistModal,
    setShowPlaylistsModal,
    setVideoToAddToPlaylist,
    removeVideoFromPlaylist,
  } = usePlaylist();

  const handleAddToPlaylist = () => {
    if (user) {
      if (playlistId) {
        removeVideoFromPlaylist(playlistId, video._id);
      } else {
        setVideoToAddToPlaylist(video);
        if (playlists.length === 0) {
          setCreateNewPlaylistModal(true);
        } else {
          setShowPlaylistsModal(true);
        }
      }
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="sui_card">
      <div className="card_img_wrapper">
        <button
          title="watch later"
          className="sui_btn_float float_top_right stc_red_icon"
        >
          <CarbonTime />
        </button>
        <button
          title={`${playlistId ? "remove from playlist" : "add to playlist"}`}
          className="sui_btn_float stf_float_bottom_right stc_red_icon"
          onClick={handleAddToPlaylist}
        >
          {playlistId ? <IcRoundPlaylistRemove /> : <IcRoundPlaylistAdd />}
        </button>
        <div className="card_video_length">{videoLength}</div>
        <img src={videoThumbnail} alt={title} />
      </div>
      <div className="card_content_wrapper">
        <div className="card_content_channel_wrapper">
          <img src={channelThumbnail} alt={channelName} />
          <div className="card_subscribers">
            {subscribers}
            <p>subs</p>
          </div>
        </div>
        <div className="card_content_title_wrapper">
          <h2 className="card_video_title">{title}</h2>
          <div className="view_likes_wrapper">
            <p>{views} views</p>•<p>{likes} likes</p>
          </div>
          <Link to={channelLink}>{channelName}</Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
