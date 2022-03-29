import { useAuth } from "context/auth-context/auth-context";
import { createContext, useContext, useState, useEffect } from "react";
import { useAxios } from "utils";

const WatchLaterContext = createContext();

const useWatchLater = () => useContext(WatchLaterContext);

function WatchLaterProvider({ children }) {
  const [watchLater, setWatchLater] = useState([]);
  const { user, token } = useAuth();
  const { response, operation } = useAxios();

  useEffect(() => {
    if (user) {
      setWatchLater(user.watchLater);
    } else {
      setWatchLater([]);
    }
  }, [user]);

  useEffect(() => {
    if (response && response.watchLater) {
      setWatchLater(response.watchLater);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const addVideoToWatchLater = (video) => {
    const findIndex = watchLater.findIndex((v) => v._id === video._id);
    if (findIndex === -1) {
      operation({
        method: "post",
        url: "/api/user/watchlater",
        headers: { authorization: token },
        data: { video: video },
      });
    }
  };

  const removeVideoFromWatchLater = (videoId) => {
    const url = `/api/user/watchlater/${videoId}`;
    operation({
      method: "delete",
      url: url,
      headers: { authorization: token },
    });
  };

  return (
    <WatchLaterContext.Provider
      value={{ watchLater, addVideoToWatchLater, removeVideoFromWatchLater }}
    >
      {children}
    </WatchLaterContext.Provider>
  );
}

export { WatchLaterProvider, useWatchLater };
