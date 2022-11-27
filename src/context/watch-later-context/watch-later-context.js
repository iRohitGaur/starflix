import { useAuth } from "context/auth-context/auth-context";
import { createContext, useContext, useState, useEffect } from "react";
import { useAxios, useToast } from "utils";

const WatchLaterContext = createContext();

const useWatchLater = () => useContext(WatchLaterContext);

function WatchLaterProvider({ children }) {
  const [watchLater, setWatchLater] = useState([]);
  const { user } = useAuth();
  const { loading, operation } = useAxios();

  const { sendToast } = useToast();

  useEffect(() => {
    if (user) {
      setWatchLater(user.watchLater);
    } else {
      setWatchLater([]);
    }
  }, [user]);

  const toggleVideoInWatchLater = async (videoId) => {
    if (!loading) {
      try {
        const response = await operation({
          method: "post",
          url: "/user/watchlater",
          data: { videoId },
        });
        sendToast("Updated your Watch Later");
        setWatchLater(response.watchLater);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <WatchLaterContext.Provider
      value={{
        watchLater,
        toggleVideoInWatchLater,
      }}
    >
      {children}
    </WatchLaterContext.Provider>
  );
}

export { WatchLaterProvider, useWatchLater };
