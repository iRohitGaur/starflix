import { useVideo } from "context";
import React from "react";

function FilterChip({ text }) {
  const { videoState, videoDispatch } = useVideo();

  const isSelected =
    videoState.filters.length === 0 && text === "all"
      ? true
      : videoState.filters.includes(text);

  const handleFilter = () => {
    text === "all" && videoDispatch({ type: "RESET_FILTERS" });
    text !== "all" && videoDispatch({ type: "FILTER", payload: text });
  };

  return (
    <div
      className={`filter_chip ${isSelected ? "filter_chip_selected" : ""}`}
      onClick={handleFilter}
    >
      {text}
    </div>
  );
}

export default FilterChip;
