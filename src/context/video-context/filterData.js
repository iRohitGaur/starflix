const underXMinutes = (videoLength, minutes) => {
  const timeArray = videoLength.split(":");
  return timeArray.length > 2 ? false : Number(timeArray[0]) < Number(minutes);
};

export default function filterData(state) {
  // RG: Filter based on Category & under x minutes
  const underMinsIndex = state.filters.findIndex((f) => f.includes("under"));

  return state.filters.length === 0
    ? [...state.videoData]
    : underMinsIndex === -1
    ? state.videoData.filter((v) => state.filters.includes(v.category))
    : state.filters.length === 1
    ? state.videoData.filter((v) =>
        underXMinutes(
          v.videoLength,
          state.filters[underMinsIndex].split(" ")[1]
        )
      )
    : state.videoData
        .filter((v) => state.filters.includes(v.category))
        .filter((v) =>
          underXMinutes(
            v.videoLength,
            state.filters[underMinsIndex].split(" ")[1]
          )
        );
}
