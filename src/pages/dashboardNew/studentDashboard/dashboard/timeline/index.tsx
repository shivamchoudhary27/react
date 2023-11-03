import "./style.scss";
import Mobile from "./view/mobile";
import Browser from "./view/browser";
import { useSelector } from "react-redux";
import { getData } from "../../../../../adapters";
import React, { useState, useEffect } from "react";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  apiStatus: any;
  courseSession: any;
  blTimelineEvent: any;
}

const Timeline = (props: Props) => {

  // API call to get timeline calender events according to role === >>>
  // useEffect(() => {
  //   const query = {
  //     wsfunction: "local_blapi_course_bltimeline_api",
  //     userid: userId,
  //     role: currentUserRole.shortName,
  //   };
  //   setApiStatus("started");
  //   getData(query)
  //     .then((res) => {
  //       if (res.status === 200 && res.data !== "") {
  //         setBlTimelineEvent(res.data);
  //       }
  //       setApiStatus("finished");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setApiStatus("finished");
  //     });
  // }, [currentUserRole]);

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
          apiStatus={props.apiStatus}
          blTimelineEvent={props.blTimelineEvent}
          getTimetableTime={getTimetableTime}
          formatDynamicTimestamp={formatDynamicTimestamp}
        />
      ) : isDesktop ? (
        <Browser
          apiStatus={props.apiStatus}
          blTimelineEvent={props.blTimelineEvent}
          getTimetableTime={getTimetableTime}
          formatDynamicTimestamp={formatDynamicTimestamp}
        />
      ) : (
        <Browser
          apiStatus={props.apiStatus}
          blTimelineEvent={props.blTimelineEvent}
          getTimetableTime={getTimetableTime}
          formatDynamicTimestamp={formatDynamicTimestamp}
        />
      )}
    </React.Fragment>
  );
};

export default Timeline;
