import "./style.scss";
import React from "react";
import { Link } from "react-router-dom";
import Errordiv from "../../../../../widgets/alert/errordiv";
import ListSkeleton from "../../../../../widgets/skeleton/list";

type Props = {
  eventsPacket: any;
  apiStatus: string;
  showAlert: boolean;
  apiStatusCourse: string;
  courseFilterActive: boolean;
};

const TimelineTable: React.FC<Props> = (props) => {
  // console.log("eventsPacket------", props.eventsPacket)

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
    <div className="mitblock-body">
      {props.eventsPacket.length > 0 &&
        props.eventsPacket.map((event: any, index: number) => (
          <div className="d-flex align-items-center atb-row" key={index}>
            {/* <div className="align-self-start me-3"><img src={el.course.courseimage} alt="" /></div> */}
            <div className="atb-info">
              {props.courseFilterActive !== false && (
                <h6 style={{ fontSize: "18px", fontWeight: "700" }}>
                  {event.course.fullname}
                </h6>
              )}
              <h6>
                <a href={event.viewurl}>
                  {formatDynamicTimestamp(event.timesort)}
                </a>
              </h6>
              <p>
                {event.name}.{" "}
                {props.courseFilterActive !== true && (
                  <b>{event.course.fullname}</b>
                )}
              </p>
              <p>{getTimetableTime(event.timestart)}</p>
            </div>
            <Link
              to={event.action.url}
              className="btn btn-light btn-sm atb-button"
            >
              {event.action.name}
            </Link>
          </div>
        ))}

      {props.apiStatus === "started" && props.eventsPacket.length === 0 && (
        <ListSkeleton />
      )}
      {/* {props.apiStatus === "finished" && props.eventsPacket.length === 0 && (
        <Errordiv msg="No record found!" cstate className="" />
      )} */}
    </div>
  );
};

export default TimelineTable;
