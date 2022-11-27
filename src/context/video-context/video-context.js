import { createContext, useContext, useEffect, useReducer } from "react";
import { useAxios } from "utils";
import filterData from "./filterData";

const VideoContext = createContext();

const useVideo = () => useContext(VideoContext);

function VideoProvider({ children }) {
  const { operation, loading } = useAxios();

  const initialState = {
    videoData: [],
    filters: [],
  };

  const [videoState, videoDispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "SETVALUE":
        return {
          ...state,
          [action.actionKey]: action.actionValue,
        };
      case "FILTER":
        return {
          ...state,
          filters: state.filters.includes(action.payload)
            ? state.filters.filter((f) => f !== action.payload)
            : action.payload.includes("under")
            ? state.filters.findIndex((f) => f.includes("under")) === -1
              ? [...state.filters, action.payload]
              : state.filters.map((f) =>
                  f.includes("under") ? action.payload : f
                )
            : [...state.filters, action.payload],
        };
      case "RESET_FILTERS":
        return {
          ...initialState,
          videoData: [...state.videoData],
        };
      default:
        throw new Error(`Unhandled type: ${action.type}`);
    }
  }, initialState);

  const filteredVideos = filterData(videoState);

  const videos = videoState.videoData;

  const featuredVideos = videos.filter((p) => p.featured);

  useEffect(() => {
    (async () => {
      try {
        const response = await operation({
          method: "get",
          url: "/videos",
        });
        videoDispatch({
          type: "SETVALUE",
          actionKey: "videoData",
          actionValue: response,
        });
      } catch (error) {
        console.error(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VideoContext.Provider
      value={{
        filteredVideos,
        featuredVideos,
        videoState,
        videoDispatch,
        loading,
        videos,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export { VideoProvider, useVideo };
