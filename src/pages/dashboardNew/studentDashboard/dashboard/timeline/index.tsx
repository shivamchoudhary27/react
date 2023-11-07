import "./style.scss";
import React from "react";
import Mobile from "./view/mobile";
import Browser from "./view/browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  apiStatus: any;
  eventsPacket: any;
  showAlert: boolean;
  courseSession: any;
  getFilterSelectValue: any
};

const Timeline: React.FC<Props> = (props) => {
  const getTimetableTime = (sessionDate: number) => {
    const timestamp = sessionDate * 1000;
    const timeZone = "Asia/Kolkata"; // Specify the time zone (Indian Standard Time)

    // Format the date and time in the desired time zone
    const formattedTime = new Date(timestamp)
      .toLocaleString("en-IN", {
        timeZone,
        hour: "numeric",
        minute: "numeric",
        // second: 'numeric',
        hour12: true,
      })
      .toLocaleUpperCase();
    return formattedTime;
  };

  const formatDynamicTimestamp = (timestamp: number) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date(timestamp * 1000); // Convert the timestamp from seconds to milliseconds
    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    const formattedDate = `${dayOfWeek}, ${day} ${monthName} ${year}`;
    return formattedDate;
  };

  return (
    <React.Fragment>
      {isMobile ? (
        <Mobile
          showAlert={props.showAlert}
          apiStatus={props.apiStatus}
          eventsPacket={props.eventsPacket}
          getTimetableTime={getTimetableTime}
          formatDynamicTimestamp={formatDynamicTimestamp}
        />
      ) : isDesktop ? (
        <Browser
          showAlert={props.showAlert}
          apiStatus={props.apiStatus}
          eventsPacket={props.eventsPacket}
          getTimetableTime={getTimetableTime}
          formatDynamicTimestamp={formatDynamicTimestamp}
          getFilterSelectValue={props.getFilterSelectValue}
        />
      ) : (
        <Browser
          showAlert={props.showAlert}
          apiStatus={props.apiStatus}
          eventsPacket={props.eventsPacket}
          getTimetableTime={getTimetableTime}
          formatDynamicTimestamp={formatDynamicTimestamp}
          getFilterSelectValue={props.getFilterSelectValue}
        />
      )}
    </React.Fragment>
  );
};

export default Timeline;
