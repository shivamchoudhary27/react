const enroled_courses = JSON.parse(localStorage.getItem("enroled_courses"));

const initialColors = JSON.stringify({
  user: "red",
  course: "blue",
  site: "green",
  category: "pink",
  forum: "red",
  quiz: "yellow",
  workshop: "blue",
  assignment: "green",
  page: "gray",
  book: "black",
});

const getEventColor = (event, colorConfig) => {
  return (colorConfig[event] !== undefined) ? colorConfig[event] : 'blue';
};

export { getEventColor, enroled_courses, initialColors };
