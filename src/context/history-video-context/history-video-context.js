import { useAuth } from "context/auth-context/auth-context";
import { createContext, useContext, useState, useEffect } from "react";
import { useAxios } from "utils";

const HistoryVideosContext = createContext();

const useHistoryVideos = () => useContext(HistoryVideosContext);

function HistoryVideosProvider({ children }) {
  const [historyVideos, setHistoryVideos] = useState([]);
  const { user } = useAuth();
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

  const addVideoToHistory = async (videoId) => {
    try {
      const response = await operation({
        method: "post",
        url: "/user/history",
        data: { videoId },
      });
      setHistoryVideos(response.history);
    } catch (error) {
      console.error(error);
    }
  };

  const removeVideoFromHistory = async (videoId) => {
    try {
      const response = await operation({
        method: "delete",
        url: "/user/history",
        data: { videoId },
      });
      setHistoryVideos(response.history);
    } catch (error) {
      console.error(error);
    }
  };

  const clearHistory = async () => {
    try {
      const response = await operation({
        method: "delete",
        url: "/user/history/all",
      });
      setHistoryVideos(response.history);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <HistoryVideosContext.Provider
      value={{
        historyVideos,
        addVideoToHistory,
        removeVideoFromHistory,
        clearHistory,
      }}
    >
      {children}
    </HistoryVideosContext.Provider>
  );
}

export { HistoryVideosProvider, useHistoryVideos };
