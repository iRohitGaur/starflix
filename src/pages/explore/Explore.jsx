import { IcRoundClose } from "assets/Icons";
import { Card } from "components";
import { useVideo } from "context";
import React, { useState, useEffect, useRef } from "react";
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
  const [searchedTermFound, setSearchedTermFound] = useState(true);
  const [searchedVideos, setSearchedVideos] = useState([]);

  const timer = useRef();

  useEffect(() => {
    clearTimeout(timer.current);
    setSearchedTermFound(true);

    timer.current = setTimeout(() => {
      if (searchText.trim() !== "") {
        const result = filteredVideos.filter((v) =>
          v.title.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedVideos(result);
        if (result.length === 0) {
          setSearchedTermFound(false);
        }
      } else {
        setSearchedVideos([]);
      }
    }, 400);

    return () => clearTimeout(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchText("");
    setSearchedVideos([]);
  };

  const isSearchActive = searchText.trim() !== "";

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
        {isSearchActive && !searchedTermFound
          ? "No videos to show"
          : searchedVideos.length > 0
          ? searchedVideos.map((video) => (
              <Card key={video._id} videoId={video._id} />
            ))
          : filteredVideos.map((video) => (
              <Card key={video._id} videoId={video._id} />
            ))}
      </div>
    </main>
  );
}

export default Explore;
