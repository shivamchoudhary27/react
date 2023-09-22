export const generateHours = () => {
  const hours = [];
  for (let i = 7; i <= 20; i++) {
    let hoursObj = {};
    if (i < 10) {
      hoursObj = { id: i, name: "0" + i.toString() };
    } else {
      hoursObj = { id: i, name: i.toString() };
    }
    hours.push(hoursObj);
  }
  return hours;
};

// export const generateMinutes = () => {
//   const minutes = [];
//   for (let i = 1; i <= 60; i++) {
//     const minutesObj = { id: i, name: i.toString() };
//     minutes.push(minutesObj);
//   }
//   return minutes;
// };

export const saperateHours = (val) => {
  if (val !== undefined) {
    const time = val;
    const hours = time.split(":");
    const getHours = hours[0];
    return getHours;
  }
};

export const saperateMinutes = (val) => {
  if (val !== undefined) {
    const time = val;
    const minutes = time.split(":");
    const getMinutes = minutes[1];
    return getMinutes;
  }
};
