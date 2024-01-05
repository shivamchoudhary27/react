// timestamp to 01/02/2024 this format date converter === >>
export const convertTimestampToDate = (value) => {
  if (value !== undefined && value !== "" && value !== "0") {
    const timestamp = parseInt(value);
    const date = new Date(timestamp * 1000);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  } else {
    return "--/--/----";
  }
};

// January 4, 2024 format date converter === >>
export const formattedDate = (date) => {
  const getFormatedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return getFormatedDate;
};