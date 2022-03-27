export const underXMinutes = (videoLength, minutes) => {
  const timeArray = videoLength.split(":");
  return timeArray.length > 2 ? false : Number(timeArray[0]) < minutes;
};
