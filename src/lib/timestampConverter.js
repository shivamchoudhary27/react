import moment from "moment";
import 'moment-timezone';

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

// converted date time UTC to IST
export const formattedDateTime = (date) => {
  const utcDate = moment.utc(date);
  const istDate = utcDate.tz('Asia/Kolkata').format('MMMM DD, YYYY [at] h:mm A');
  // console.log(istDate, 'istDate')
  return istDate;
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
  // console.log(date)
  const originalDate = date;
  const formattedDate = moment(originalDate).format("DD-MM-YYYY");
  // console.log(formattedDate)
  return (formattedDate);
}

// Converts a date string from "day/month/year" format to  weekday, month, day, year, hour, minute, second, and time zone name.

export const formatDateWithDetails = (dateString) => {
  // Split the date string into day, month, and year parts
  const [day, month, year] = dateString.split('/');
  // Create a Date object with the parsed parts (month - 1 because months are zero-indexed)
  const date = new Date(year, month - 1, day);
  // Format the date string in the desired format
  const formattedDate = date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
  });

  return formattedDate;
};