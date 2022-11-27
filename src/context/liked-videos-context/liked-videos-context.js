import { useAuth } from "context/auth-context/auth-context";
import { createContext, useContext, useState, useEffect } from "react";
import { useAxios, useToast } from "utils";

const LikedVideosContext = createContext();

const useLikedVideos = () => useContext(LikedVideosContext);

function LikedVideosProvider({ children }) {
  const [likedVideos, setLikedVideos] = useState([]);
  const { user } = useAuth();
  const { loading, operation } = useAxios();

  const { sendToast } = useToast();

  useEffect(() => {
    if (user) {
      setLikedVideos(user.liked);
    } else {
      setLikedVideos([]);
    }
  }, [user]);

  const toggleVideoInLikes = async (videoId) => {
    if (!loading) {
      try {
        const response = await operation({
          method: "post",
          url: "/user/liked",
          data: { videoId },
        });
        sendToast("Updated your Liked Videos");
        setLikedVideos(response.liked);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <LikedVideosContext.Provider value={{ likedVideos, toggleVideoInLikes }}>
      {children}
    </LikedVideosContext.Provider>
  );
}

export { LikedVideosProvider, useLikedVideos };
