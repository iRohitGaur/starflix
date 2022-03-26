import { createContext, useContext, useEffect, useReducer } from "react";
import { useAxios } from "utils";

const VideoContext = createContext();

const useVideo = () => useContext(VideoContext);

function VideoProvider({ children }) {
  const { response, operation, loading } = useAxios();

  const initialState = {
    videoData: [],
    category: [],
    bird: [],
  };

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "SETVALUE":
        return {
          ...state,
          [action.actionKey]: action.actionValue,
        };
      case "FILTER":
        return {
          ...state,
          [action.filterType]: state[action.filterType].includes(action.filter)
            ? state[action.filterType].filter((type) => type !== action.filter)
            : [...state[action.filterType], action.filter],
        };
      case "RESET_FILTERS":
        return {
          ...initialState,
          videoData: state.videoData,
        };
      default:
        throw new Error(`Unhandled type: ${action.type}`);
    }
  }, initialState);
  const featuredVideos = state.videoData.filter((p) => p.featured);

  useEffect(() => {
    operation({
      method: "get",
      url: "/api/videos",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (response) {
      dispatch({
        type: "SETVALUE",
        actionKey: "videoData",
        actionValue: response.videos,
      });
    }
  }, [dispatch, response]);

  return (
    <VideoContext.Provider value={{ featuredVideos, state, dispatch, loading }}>
      {children}
    </VideoContext.Provider>
  );
}

export { VideoProvider, useVideo };
