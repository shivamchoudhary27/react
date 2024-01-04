import { format, eachDayOfInterval } from "date-fns";

export const getMonthDatesFormatted = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // Months are zero-based, so November is 10

  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);

  const allDates = eachDayOfInterval({ start: startDate, end: endDate });

  const formattedDates = allDates.map((date) => format(date, "dd MMM"));

  return formattedDates;
};
