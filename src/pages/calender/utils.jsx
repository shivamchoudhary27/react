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
  return (colorConfig[event] !== undefined) ? colorConfig[event] : 'blue';
};

export { getEventColor, enroled_courses, initialColors };
