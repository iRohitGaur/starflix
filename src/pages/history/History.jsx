import { Card } from "components";
import { useHistoryVideos } from "context";
import React from "react";
import "./history.css";

function History() {
  const { historyVideos, clearHistory } = useHistoryVideos();

  return (
    <main className="history_page">
      <div className="history_videos_wrapper">
        {historyVideos.length !== 0 ? (
          <button
            className="sui_btn remove_history btn_v1"
            onClick={clearHistory}
          >
            Clear History
          </button>
        ) : (
          <>
            <p>Nothing to show here.</p>
            <p>When you watch a video it will be added to your History.</p>
          </>
        )}
        <div className="history_videos">
          {historyVideos.map((videoId) => (
            <Card key={videoId} videoId={videoId} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default History;
