import { Card } from "components";
import { useVideo } from "context";
import React from "react";
import "./explore.css";
import FilterChip from "./FilterChip";

const filterChipData = [
  "all",
  "birdsound",
  "documentary",
  "birdfact",
  "under 5 minutes",
  "under 10 minutes",
  "under 60 minutes",
];

function Explore() {
  const { filteredVideos } = useVideo();

  return (
    <main className="explore_page">
      <div className="filter_chip_wrapper">
        {filterChipData.map((data) => (
          <FilterChip key={data} text={data} />
        ))}
      </div>
      <div className="filter_videos_wrapper">
        {filteredVideos.map((video) => (
          <Card key={video._id} video={video} />
        ))}
      </div>
    </main>
  );
}

export default Explore;
