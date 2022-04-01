import { Card } from "components";
import { useWatchLater } from "context";
import React from "react";
import "./watchlater.css";

function WatchLater() {
  const { watchLater } = useWatchLater();

  return (
    <main className="watch_later_page">
      <div className="watchlater_wrapper">
        {watchLater.length === 0 ? (
          <div className="stf_watch_later">
            <p>Nothing to show here.</p>
            <p>
              When you select Watch Later on any video, it will be added to your
              Watch Later.
            </p>
          </div>
        ) : (
          watchLater.map((video) => <Card key={video._id} video={video} />)
        )}
      </div>
    </main>
  );
}

export default WatchLater;
