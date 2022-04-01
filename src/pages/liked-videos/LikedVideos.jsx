import { Card } from "components";
import { useLikedVideos } from "context";
import React from "react";
import "./likedvideos.css";

function LikedVideos() {
  const { likedVideos } = useLikedVideos();

  return (
    <main className="liked_videos_page">
      <div className="likevideos_wrapper">
        {likedVideos.length === 0 ? (
          <div className="stf_like_videos">
            <p>Nothing to show here.</p>
            <p>When you like a video it will be added to your Liked Videos.</p>
          </div>
        ) : (
          likedVideos.map((video) => <Card key={video._id} video={video} />)
        )}
      </div>
    </main>
  );
}

export default LikedVideos;
