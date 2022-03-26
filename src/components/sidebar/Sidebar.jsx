import React from "react";
import "./sidebar.css";
import SidebarItem from "./SidebarItem";

const locationMapping = [
  { page: "Home", path: "/" },
  { page: "Explore", path: "/explore" },
  { page: "Playlist", path: "/playlist" },
  { page: "Liked Videos", path: "/likedvideos" },
  { page: "Watch Later", path: "/watchlater" },
  { page: "History", path: "/history" },
];

function Sidebar() {
  return (
    <aside>
      {locationMapping.map((location) => (
        <SidebarItem key={location.page} location={location} />
      ))}
    </aside>
  );
}

export default Sidebar;
