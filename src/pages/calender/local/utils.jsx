const enroled_courses = JSON.parse(localStorage.getItem("enroled_courses"));

const initialColors = JSON.stringify({
  user: "#395B64",
  course: "#95BDFF",
  site: "#698269",
  category: "#AA5656",
  attendance: "#81B214",
  forum: "#E4C988",
  quiz: "#820000",
  workshop: "#4E6C50",
  assignment: "#CB1C8D",
  page: "#460C68",
  book: "#C27664",
});

const getEventColor = (event, colorConfig) => {
  return (colorConfig[event] !== undefined) ? colorConfig[event] : '';
};

const hexToRGB = (hex, alpha) => {
  var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
}

export { getEventColor, enroled_courses, initialColors, hexToRGB };
