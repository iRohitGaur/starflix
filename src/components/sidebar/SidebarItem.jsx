import {
  CarbonHome,
  CarbonExplore,
  CarbonPlaylist,
  UiwLikeO,
  CarbonTime,
  CodiconHistory,
} from "assets/Icons";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SidebarItem({ location }) {
  const currentPath = useLocation();
  const navigate = useNavigate();

  return (
    <button
      title={location.page}
      className={`sui_btn sidebar_item_wrapper ${
        currentPath.pathname !== location.path && "btn_txt"
      }`}
      onClick={() => navigate(location.path)}
    >
      {location.page === "Home" && <CarbonHome />}
      {location.page === "Explore" && <CarbonExplore />}
      {location.page === "Playlist" && <CarbonPlaylist />}
      {location.page === "Liked Videos" && <UiwLikeO />}
      {location.page === "Watch Later" && <CarbonTime />}
      {location.page === "History" && <CodiconHistory />}
      <p>{location.page}</p>
    </button>
  );
}

export default SidebarItem;
