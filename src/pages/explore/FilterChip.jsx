import { useVideo } from "context";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

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

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    videoDispatch({ type: "RESET_FILTERS" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      videoDispatch({ type: "FILTER", payload: cat });
      navigate("/explore");
    }
  }, [videoDispatch, navigate, searchParams]);

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
