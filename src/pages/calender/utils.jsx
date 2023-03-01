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

// const getModuleColor = (module) => {
//     if (module === 'quiz') return 'orange';
//     if (module === 'forum') return 'yellow';
//     if (module === 'workshop') return 'green';
//     if (module === 'user') return '#4e7c91';
//     if (module === 'site') return '#d6f8cd';
//     if (module === 'course') return '#ffd3bd';
//     if (module === 'category') return '#e0cbe0';
// }

//   const getEventTypeColor = (eventType) => {
//     if (eventType === 'user') return '#4e7c91';
//     if (eventType === 'site') return '#d6f8cd';
//     if (eventType === 'course') return '#ffd3bd';
//     if (eventType === 'category') return '#e0cbe0';
//   }

export { getEventColor, enroled_courses, initialColors };
