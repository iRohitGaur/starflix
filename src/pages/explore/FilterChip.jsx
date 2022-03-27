import { useVideo } from "context";
import React from "react";

function FilterChip({ text }) {
  const { state, dispatch } = useVideo();

  const isSelected =
    state.filters.length === 0 && text === "all"
      ? true
      : state.filters.includes(text);

  const handleFilter = () => {
    text === "all" && dispatch({ type: "RESET_FILTERS" });
    text !== "all" && dispatch({ type: "FILTER", payload: text });
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
