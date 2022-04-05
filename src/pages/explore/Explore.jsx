import { IcRoundClose } from "assets/Icons";
import { Card } from "components";
import { useVideo } from "context";
import React, { useState } from "react";
import "./explore.css";
import FilterChip from "./FilterChip";

const filterChipData = [
  "all",
  "Sort by latest",
  "birdsound",
  "documentary",
  "birdfact",
  "under 5 minutes",
  "under 10 minutes",
  "under 60 minutes",
];

function Explore() {
  const { filteredVideos } = useVideo();
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchText("");
  };

  const isSearchActive = searchText !== "";

  const searchedVideos = filteredVideos.filter((v) =>
    v.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const videosToShow = isSearchActive ? searchedVideos : filteredVideos;

  return (
    <main className="explore_page">
      <div className="filter_chip_wrapper">
        {filterChipData.map((data) => (
          <FilterChip key={data} text={data} />
        ))}
        <div className="explore_page_search_btn_wrapper">
          <input
            type="text"
            className="explore_search_input"
            placeholder="search"
            value={searchText}
            onChange={handleSearch}
          />
          {isSearchActive && (
            <button
              className="sui_btn btn_icon_fa explore_page_search_btn"
              onClick={handleClearSearch}
            >
              <IcRoundClose />
            </button>
          )}
        </div>
      </div>
      <div className="filter_videos_wrapper">
        {videosToShow.map((video) => (
          <Card key={video._id} video={video} />
        ))}
      </div>
    </main>
  );
}

export default Explore;
