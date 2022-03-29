import { Card } from "components";
import { useWatchLater } from "context";
import React from "react";
import "./watchlater.css";

function WatchLater() {
  const { watchLater } = useWatchLater();

  return (
    <main className="watch_later_page">
      <div className="watchlater_wrapper">
        {watchLater.map((video) => (
          <Card key={video._id} video={video} />
        ))}
      </div>
    </main>
  );
}

export default WatchLater;
