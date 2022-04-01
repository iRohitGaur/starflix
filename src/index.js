import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { makeServer } from "./server";
import {
  AuthProvider,
  HistoryVideosProvider,
  LikedVideosProvider,
  PlaylistProvider,
  VideoProvider,
  WatchLaterProvider,
} from "context";

makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <VideoProvider>
          <PlaylistProvider>
            <WatchLaterProvider>
              <LikedVideosProvider>
                <HistoryVideosProvider>
                  <App />
                </HistoryVideosProvider>
              </LikedVideosProvider>
            </WatchLaterProvider>
          </PlaylistProvider>
        </VideoProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
