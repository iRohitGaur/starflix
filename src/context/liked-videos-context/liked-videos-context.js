import { useAuth } from "context/auth-context/auth-context";
import { createContext, useContext, useState, useEffect } from "react";
import { useAxios } from "utils";

const LikedVideosContext = createContext();

const useLikedVideos = () => useContext(LikedVideosContext);

function LikedVideosProvider({ children }) {
  const [likedVideos, setLikedVideos] = useState([]);
  const { user, token } = useAuth();
  const { response, operation } = useAxios();

  useEffect(() => {
    if (user) {
      setLikedVideos(user.likes);
    } else {
      setLikedVideos([]);
    }
  }, [user]);

  useEffect(() => {
    if (response && response.likes) {
      setLikedVideos(response.likes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const addVideoToLikes = (video) => {
    const findIndex = likedVideos.findIndex((v) => v._id === video._id);
    if (findIndex === -1) {
      operation({
        method: "post",
        url: "/api/user/likes",
        headers: { authorization: token },
        data: { video: video },
      });
    }
  };

  const removeVideoFromLikes = (videoId) => {
    const url = `/api/user/likes/${videoId}`;
    operation({
      method: "delete",
      url: url,
      headers: { authorization: token },
    });
  };

  return (
    <LikedVideosContext.Provider
      value={{ likedVideos, addVideoToLikes, removeVideoFromLikes }}
    >
      {children}
    </LikedVideosContext.Provider>
  );
}

export { LikedVideosProvider, useLikedVideos };
