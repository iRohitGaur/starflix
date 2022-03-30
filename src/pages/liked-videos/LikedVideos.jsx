import { Card } from "components";
import { useLikedVideos } from "context";
import React from "react";
import "./likedvideos.css";

function LikedVideos() {
  const { likedVideos } = useLikedVideos();

  return (
    <main className="liked_videos_page">
      <div className="likevideos_wrapper">
        {likedVideos.map((video) => (
          <Card key={video._id} video={video} />
        ))}
      </div>
    </main>
  );
}

export default LikedVideos;
