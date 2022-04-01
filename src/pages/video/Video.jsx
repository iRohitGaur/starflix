import {
  useAuth,
  useHistoryVideos,
  useLikedVideos,
  usePlaylist,
  useVideo,
  useWatchLater,
} from "context";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player/lazy";
import "./video.css";
import { Card, CardHorizontal } from "components";
import {
  AntDesignLikeOutlined,
  IcOutlineRemoveRedEye,
  IcSharpTimer,
} from "assets/Icons";
import { useWindowDimensions } from "utils";

function Video() {
  const initialVideoState = {
    _id: "",
    title: "",
    youtubeID: "",
    videoLength: "",
    videoThumbnail: "",
    likes: "",
    views: "",
    category: "",
    bird: "",
    featured: false,
    channelName: "",
    channelThumbnail: "",
    channelLink: "",
    subscribers: "",
    description: "",
  };

  const { videoState } = useVideo();
  const { videoId } = useParams();
  const [videoPlayed, setVideoPlayed] = useState(false);
  const [video, setVideo] = useState(initialVideoState);

  useEffect(() => {
    videoState.videoData.length !== 0 &&
      setVideo(videoState.videoData.filter((v) => v._id === videoId)[0]);
  }, [videoId, videoState, videoState.videoData]);

  const { width: windowWidth } = useWindowDimensions();

  const relatedVideos = videoState.videoData
    .filter((v) => v.category === video.category && v._id !== video._id)
    .slice(0, 4);

  const {
    title,
    description,
    videoLength,
    likes,
    views,
    channelName,
    channelThumbnail,
    channelLink,
    subscribers,
  } = video;

  useEffect(() => {
    document.title = `Starflix - ${title} - Rohit Gaur`;
  }, [title]);

  const { user } = useAuth();
  const navigate = useNavigate();

  const mainSection = useRef();

  useEffect(() => {
    mainSection.current.scrollTo(0, 0);
  }, [video]);

  const {
    playlists,
    setCreateNewPlaylistModal,
    setShowPlaylistsModal,
    setVideoToAddToPlaylist,
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
      setVideoToAddToPlaylist(video);
      if (playlists.length === 0) {
        setCreateNewPlaylistModal(true);
      } else {
        setShowPlaylistsModal(true);
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

  const { addVideoToHistory } = useHistoryVideos();

  const handleOnPlay = () => {
    setVideoPlayed(true);
    addVideoToHistory(video);
  };

  return (
    <div className="video_page" ref={mainSection}>
      <div className="stf_video_player_wrapper">
        <div className="stf_video_player">
          <ReactPlayer
            controls
            onPlay={handleOnPlay}
            height="100%"
            width="100%"
            url={`https://www.youtube.com/watch?v=${videoId}`}
          />
        </div>
        <div className="stf_below_video_section">
          <div className="stf_video_description_section">
            <div className="stf_video_channel_wrapper">
              <img src={channelThumbnail} alt={channelName} />
              <div className="stf_channel_title_wrapper">
                <Link to={channelLink}>{channelName}</Link>
                <div className="card_video_subscribers">
                  {subscribers} subscribers
                </div>
              </div>
            </div>
            <div className="stf_title_cta_section">
              <div className="stf_video_page_title_desc">
                <p className="stf_video_page_video_title">{title}</p>
                <p className="stf_video_page_video_desc">{description}</p>
              </div>
              <div className="stf_page_video_cta">
                <div className="stf_page_video_cta_details">
                  <p>
                    <IcSharpTimer /> {videoLength} mins
                  </p>
                  <p>
                    <IcOutlineRemoveRedEye />{" "}
                    {videoPlayed
                      ? isNaN(Number(views))
                        ? views
                        : Number(views) + 1
                      : views}{" "}
                    views
                  </p>
                  <p onClick={handleLikedVideos}>
                    <AntDesignLikeOutlined
                      className={`video_page_add_to_likes_btn ${
                        isInLikedVideos && "video_page_is_in_liked_videos"
                      }`}
                    />
                    {isInLikedVideos
                      ? isNaN(Number(likes))
                        ? likes
                        : Number(likes) + 1
                      : likes}{" "}
                    likes
                  </p>
                </div>
                <div className="btn_watch_later_playlist">
                  <button
                    onClick={handleAddToPlaylist}
                    className="video_page_add_to_playlist_btn"
                  >
                    Add to Playlist
                  </button>
                  <button
                    className={`video_page_watch_later_btn ${
                      isInWatchLater && "video_page_is_in_watch_later"
                    }`}
                    onClick={handleWatchLater}
                  >
                    {isInWatchLater ? "Remove from Watch Later" : "Watch Later"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="stf_related_videos_wrapper">
        Related Videos
        <div className="stf_related_videos">
          {windowWidth <= 1300 && windowWidth > 500
            ? relatedVideos.map((v) => <CardHorizontal key={v._id} video={v} />)
            : relatedVideos.map((v) => <Card key={v._id} video={v} />)}
        </div>
      </div>
    </div>
  );
}

export default Video;
