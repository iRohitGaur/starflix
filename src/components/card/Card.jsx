import {
  AntDesignLikeOutlined,
  CarbonTime,
  IcRoundPlaylistAdd,
  IcRoundPlaylistRemove,
  MdiTrashCanOutline,
} from "assets/Icons";
import {
  useAuth,
  useHistoryVideos,
  useLikedVideos,
  usePlaylist,
  useVideo,
  useWatchLater,
} from "context";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./card.css";

function Card({ videoId, playlistId }) {
  const { videos } = useVideo();
  const video = videos.filter((v) => v._id === videoId)[0];
  const {
    title,
    videoLength,
    videoThumbnail,
    views,
    date,
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
    toggleVideoInPlaylist
  } = usePlaylist();

  const { watchLater, toggleVideoInWatchLater } = useWatchLater();

  const { likedVideos, toggleVideoInLikes } = useLikedVideos();

  const isInWatchLater = watchLater.findIndex((vid) => vid === videoId) !== -1;

  const isInLikedVideos =
    likedVideos.findIndex((vid) => vid === videoId) !== -1;

  const handleAddToPlaylist = (e) => {
    e.stopPropagation();
    if (user) {
      if (playlistId) {
        toggleVideoInPlaylist(playlistId, videoId);
      } else {
        setVideoToAddToPlaylist(videoId);
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

  const handleWatchLater = (e) => {
    e.stopPropagation();
    if (user) {
      toggleVideoInWatchLater(videoId);
    } else {
      navigate("/auth");
    }
  };

  const handleLikedVideos = (e) => {
    e.stopPropagation();
    if (user) {
      toggleVideoInLikes(videoId);
    } else {
      navigate("/auth");
    }
  };

  const handleVideoSelection = () => {
    navigate(`/video/${videoId}`);
  };

  const { historyVideos, removeVideoFromHistory } = useHistoryVideos();

  const isInHistoryVideos =
    historyVideos.findIndex((vid) => vid === videoId) !== -1;

  const handleRemoveVideoFromHistory = (e) => {
    e.stopPropagation();
    removeVideoFromHistory(videoId);
  };

  const { pathname } = useLocation();

  return (
    <div className="sui_card">
      <div className="card_img_wrapper" onClick={handleVideoSelection}>
        {isInHistoryVideos && pathname === "/history" && (
          <button
            title="remove from history"
            className="sui_btn_float float_top_right stf_remove_from_history_btn"
            onClick={handleRemoveVideoFromHistory}
          >
            <MdiTrashCanOutline />
          </button>
        )}
        <div className="card_btn_wrapper">
          <button
            title="add to liked videos"
            className={`sui_btn stf_card_btn float_top_right ${
              isInLikedVideos && "in_watchlater_liked"
            }`}
            onClick={handleLikedVideos}
          >
            <AntDesignLikeOutlined />
          </button>
          <button
            title="add to watch later"
            className={`sui_btn stf_card_btn float_top_right ${
              isInWatchLater && "in_watchlater_liked"
            }`}
            onClick={handleWatchLater}
          >
            <CarbonTime />
          </button>
          <button
            title={`${playlistId ? "remove from playlist" : "add to playlist"}`}
            className="sui_btn stf_card_btn stf_float_bottom_right"
            onClick={handleAddToPlaylist}
          >
            {playlistId ? <IcRoundPlaylistRemove /> : <IcRoundPlaylistAdd />}
          </button>
        </div>
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
            <p>{date}</p>•<p>{views} views</p>
          </div>
          <Link to={channelLink}>{channelName}</Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
