import moment from "moment";

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

export const formattedDateTime = (date) => {
  const getFormatedDate = new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    // second: "numeric",
  });
  return getFormatedDate;
};


// =========================================================================
export const formattedDateNew = (timestamp) => {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const formatter = new Intl.DateTimeFormat('en-US', options);

  return formatter.format(date);
}

// date Str to timestamp === >>
const dateStrToTimmestamp = (date) => {
  const dateStr = date;
  const timestamp = new Date(dateStr).getTime() / 1000;
  return timestamp
}

// 3 Days ago format date converter === >>
export const timestampToDaysAgoConverter = (date) => {
  const timestamp = dateStrToTimmestamp(date);
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const differenceInSeconds = currentTimestamp - timestamp;
  const differenceInDays = Math.floor(differenceInSeconds / (24 * 60 * 60));
  const formattedDate = `${differenceInDays} days ago`;
  return formattedDate;
};

//  convert the date format from "yyyy-MM-dd" to "dd-MM-yyyy" === >>
export const dateConverterToDYM = (date) => {
  console.log(date)
  const originalDate = date;
  const formattedDate = moment(originalDate).format("DD-MM-YYYY");
  console.log(formattedDate)
  return (formattedDate);
}

