// set next 7 days timestamp from current timestamp === >>>
export const next7DaysTimestamp = (timestamp) => {
  const givenDate = new Date(timestamp * 1000);
  const sevenDaysLater = new Date(givenDate);
  sevenDaysLater.setDate(givenDate.getDate() + 7);
  const timestampForNext7Days = Math.floor(sevenDaysLater / 1000);
  return timestampForNext7Days;
};

export const next30DaysTimestamp = (timestamp) => {
  const givenDate = new Date(timestamp * 1000);
  const sevenDaysLater = new Date(givenDate);
  sevenDaysLater.setDate(givenDate.getDate() + 30);
  const timestampForNext7Days = Math.floor(sevenDaysLater / 1000);
  return timestampForNext7Days;
};

export const overdueTimestamp = (timestamp) => {
  const givenDate = new Date(timestamp * 1000);
  const sevenDaysLater = new Date(givenDate);
  sevenDaysLater.setDate(givenDate.getDate() - 30);
  const timestampForNext7Days = Math.floor(sevenDaysLater / 1000);
  return timestampForNext7Days;
};
