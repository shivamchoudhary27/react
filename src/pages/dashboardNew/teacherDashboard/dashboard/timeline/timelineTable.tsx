import "./style.scss";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Errordiv from "../../../../../widgets/alert/errordiv";
import ListSkeleton from "../../../../../widgets/skeleton/list";

type Props = {
  apiStatus: string;
  blTimelineEvent: any;
};

const TimelineTable = (props: Props) => {
  const [status, setStatus] = useState(false)
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

  // useEffect(() => {
  //   props.blTimelineEvent.map((item: any) => {
  //     if(item.events.length === 0){
  //       setStatus(true)
  //     }else{
  //       setStatus(false)
  //     }
  //   })
  // }, [props.blTimelineEvent])

  return (
    <React.Fragment>
      <div className="mitblock-body">
        {props.apiStatus === "started" &&
          props.blTimelineEvent.length === 0 && <ListSkeleton />}
        {props.blTimelineEvent.length > 0 && props.blTimelineEvent.map((item: any, index: number) =>
          item.events.length > 0 && (
            item.events.map((el: any) => (
              <div className="d-flex align-items-center atb-row" key={index}>
                {/* <div className="align-self-start me-3"><img src={el.course.courseimage} alt="" /></div> */}
                <div className="atb-info">
                  <h6>
                    <a href={el.viewurl}>
                      {formatDynamicTimestamp(el.timesort)}
                    </a>
                  </h6>
                  {/* <div
                    dangerouslySetInnerHTML={{ __html: el.formattedtime }}
                  ></div> */}
                  <p>{el.name}</p>
                  <p>{getTimetableTime(el.timestart)}</p>
                </div>
                <Link
                  to={el.action.url}
                  className="btn btn-light btn-sm atb-button"
                >
                  {el.action.name}
                </Link>
              </div>
            ))
          ) 
          // : (
          //   <Errordiv msg="No record found!" cstate className="" />
          // )
        )}
        {props.apiStatus === "finished" &&
          props.blTimelineEvent.length === 0 && status !== false && <ListSkeleton />}
      </div>
    </React.Fragment>
  );
};

export default TimelineTable;
