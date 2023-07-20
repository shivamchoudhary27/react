const enroled_courses = JSON.parse(localStorage.getItem("enroled_courses"));

const initialColors = JSON.stringify({  
  site: "#0E79EC",
  category: "#166EE6",
  course: "#0C62E2",
  user: "#1089F3",
  quiz: "#0D71E9",
  assignment: "#0E6DE7",
  workshop: "#0C67E5",
  attendance: "#0C65E3",
  forum: "#317FE9",  
  page: "#70A9F1",
  book: "#00000",
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
