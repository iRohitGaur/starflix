import {
  AntDesignLikeOutlined,
  CarbonTime,
  IcRoundPlaylistAdd,
  IcRoundPlaylistRemove,
} from "assets/Icons";
import { useAuth, useLikedVideos, usePlaylist, useWatchLater } from "context";
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

  const { watchLater, addVideoToWatchLater, removeVideoFromWatchLater } =
    useWatchLater();

  const { likedVideos, addVideoToLikes, removeVideoFromLikes } =
    useLikedVideos();

  const isInWatchLater =
    watchLater.findIndex((v) => v._id === video._id) !== -1;

  const isInLikedVideos =
    likedVideos.findIndex((v) => v._id === video._id) !== -1;

  const handleAddToPlaylist = (e) => {
    e.stopPropagation();
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

  const handleWatchLater = (e) => {
    e.stopPropagation();
    isInWatchLater
      ? removeVideoFromWatchLater(video._id)
      : addVideoToWatchLater(video);
  };

  const handleLikedVideos = (e) => {
    e.stopPropagation();
    isInLikedVideos ? removeVideoFromLikes(video._id) : addVideoToLikes(video);
  };

  const handleVideoSelection = () => {
    navigate(`/video/${video._id}`);
  };

  return (
    <div className="sui_card">
      <div className="card_img_wrapper" onClick={handleVideoSelection}>
        <div className="card_btn_wrapper">
          <button
            title="add to watch later"
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
            <p>{views} views</p>•<p>{likes} likes</p>
          </div>
          <Link to={channelLink}>{channelName}</Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
