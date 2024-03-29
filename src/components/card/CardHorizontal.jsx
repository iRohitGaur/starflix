import {
  AntDesignLikeOutlined,
  CarbonTime,
  IcRoundPlaylistAdd,
  IcRoundPlaylistRemove,
} from "assets/Icons";
import {
  useAuth,
  useLikedVideos,
  usePlaylist,
  useVideo,
  useWatchLater,
} from "context";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./card.css";

function CardHorizontal({ videoId, playlistId }) {
  const { videos } = useVideo();
  const video = videos.filter((v) => v._id === videoId);
  const {
    title,
    description,
    videoLength,
    videoThumbnail,
    likes,
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
    toggleVideoInPlaylist,
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
    toggleVideoInWatchLater(videoId);
  };

  const handleLikedVideos = (e) => {
    e.stopPropagation();
    toggleVideoInLikes(videoId);
  };

  const handleVideoSelection = () => {
    navigate(`/video/${videoId}`);
  };

  return (
    <div className="sui_card card_horizontal">
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
        <div className="card_content_title_wrapper">
          <h2 className="card_video_title">{title}</h2>
          <div className="view_likes_wrapper">
            <p>{date}</p>•<p>{views} views</p>•<p>{likes} likes</p>
          </div>
        </div>
        <p className="card_video_description">{description}</p>
        <div className="card_content_channel_wrapper">
          <img src={channelThumbnail} alt={channelName} />
          <div>
            <Link to={channelLink}>{channelName}</Link>
            <p className="card_subscribers">{subscribers} subscribers</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardHorizontal;
