const underXMinutes = (videoLength, minutes) => {
  const timeArray = videoLength.split(":");
  return timeArray.length > 2 ? false : Number(timeArray[0]) < Number(minutes);
};

export default function filterData(state) {
  // RG: Filter based on Category & under x minutes

  let stateFilters = [...state.filters];

  let dataToFilter = [...state.videoData];

  if (stateFilters.length === 0) {
    // RG: No filter. Return with filtering
    return dataToFilter;
  }

  // RG: check if filter has 'under x minute'
  const underMinsIndex = stateFilters.findIndex((f) => f.includes("under"));

  if (underMinsIndex !== -1) {
    // RG: 'under x minute' is present. filter accordingly
    dataToFilter = dataToFilter.filter((v) =>
      underXMinutes(v.videoLength, stateFilters[underMinsIndex].split(" ")[1])
    );
    // RG: remove it from filter state so that it doesn't interfere with category at a later stage
    stateFilters = stateFilters.filter((f) => !f.includes("under"));
  }

  // RG: check if filter has 'sort by latest'
  const sortByLatestIndex = stateFilters.findIndex((f) =>
    f.includes("Sort by latest")
  );

  if (sortByLatestIndex !== -1) {
    // RG: 'sort by latest' is present. sort accordingly
    dataToFilter = dataToFilter.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    // RG: remove it from filter state so that it doesn't interfere with category at a later stage
    stateFilters = stateFilters.filter((f) => !f.includes("Sort by latest"));
  }

  // RG: filter on category only if any category is present
  if (stateFilters.length !== 0) {
    dataToFilter = dataToFilter.filter((v) =>
      stateFilters.includes(v.category)
    );
  }

  return dataToFilter;
}
