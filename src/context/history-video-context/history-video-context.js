import { useAuth } from "context/auth-context/auth-context";
import { createContext, useContext, useState, useEffect } from "react";
import { useAxios } from "utils";

const HistoryVideosContext = createContext();

const useHistoryVideos = () => useContext(HistoryVideosContext);

function HistoryVideosProvider({ children }) {
  const [historyVideos, setHistoryVideos] = useState([]);
  const { user, token } = useAuth();
  const { response, operation } = useAxios();

  useEffect(() => {
    if (user) {
      setHistoryVideos(user.history);
    } else {
      setHistoryVideos([]);
    }
  }, [user]);

  useEffect(() => {
    if (response && response.history) {
      setHistoryVideos(response.history);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const addVideoToHistory = (video) => {
    const findIndex = historyVideos.findIndex((v) => v._id === video._id);
    if (findIndex === -1) {
      operation({
        method: "post",
        url: "/api/user/history",
        headers: { authorization: token },
        data: { video: video },
      });
    }
  };

  const removeVideoFromHistory = (videoId) => {
    const url = `/api/user/history/${videoId}`;
    operation({
      method: "delete",
      url: url,
      headers: { authorization: token },
    });
  };

  const clearHistory = () => {
    operation({
      method: "delete",
      url: "/api/user/history/all",
      headers: { authorization: token },
    });
  }

  return (
    <HistoryVideosContext.Provider
      value={{ historyVideos, addVideoToHistory, removeVideoFromHistory, clearHistory }}
    >
      {children}
    </HistoryVideosContext.Provider>
  );
}

export { HistoryVideosProvider, useHistoryVideos };
