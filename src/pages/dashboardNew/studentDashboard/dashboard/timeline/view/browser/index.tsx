import FilterDropdown from "../../filterDropdown";
import Errordiv from "../../../../../../../widgets/alert/errordiv";
import ListSkeleton from "../../../../../../../widgets/skeleton/list";
import { Link } from "react-router-dom";

type Props = {
  eventsPacket: any;
  apiStatus: string;
  showAlert: boolean;
  apiStatusCourse: string;
  getSortFilterValue: any;
  getFilterSelectValue: any;
  courseFilterActive: boolean;
  filterTimestampSort: string;
  filterTimestampValue: string;
};

const Browser: React.FC<Props> = (props) => {
  const currentDate = new Date();
  const currentTimestamp = Math.floor(currentDate.getTime() / 1000);

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
    <div className="mitblock activityTimeline-block">
      <h3 className="mitblock-title">Activity Timeline</h3>
      <FilterDropdown
      
        eventsPacket={props.eventsPacket}
        getFilterSelectValue={props.getFilterSelectValue}
        filterTimestampValue={props.filterTimestampValue}
        getSortFilterValue={props.getSortFilterValue}
        filterTimestampSort={props.filterTimestampSort}
      />
        <div className="mitblock-body">
      {props.eventsPacket.length > 0 &&
        props.eventsPacket.map((event: any, index: number) =>
          props.filterTimestampSort !== "course" ? (
            <div className="d-flex align-items-center atb-row" key={index}>
              {/* <div className="align-self-start me-3"><img src={el.course.courseimage} alt="" /></div> */}
              <div className="atb-info">
                <h6>
                  <a href={event.viewurl} className="me-2">
                    {formatDynamicTimestamp(event.timesort)}
                  </a>
                  {event.timesort < currentTimestamp && (
                    <span
                      style={{
                        padding: "3px",
                        fontSize: "11px",
                        fontWeight: 410,
                        borderRadius: "10px",
                        backgroundColor: "#FF8989",
                        display: "inline-block",
                      }}
                    >
                      Overdue
                    </span>
                  )}
                </h6>
                <p>
                  {event.name}. <b>{event.course.fullname}</b>
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
          ) : (
            <div className="d-flex align-items-center atb-row" key={index}>
              {/* <div className="align-self-start me-3"><img src={el.course.courseimage} alt="" /></div> */}
              <div className="atb-info">
                <h6>
                  <a href={event.viewurl} className="me-2">
                    {event.course.fullname}
                  </a>
                  {event.timesort < currentTimestamp && (
                    <span
                      style={{
                        padding: "3px",
                        fontSize: "11px",
                        fontWeight: 410,
                        borderRadius: "10px",
                        backgroundColor: "#FF8989",
                        display: "inline-block",
                      }}
                    >
                      Overdue
                    </span>
                  )}
                  <p>
                    {event.name}
                    {".  "}
                  </p>
                </h6>
                <p>
                  <b>{formatDynamicTimestamp(event.timesort)}</b>
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
          )
        )}
        {props.apiStatus === "started" && props.eventsPacket.length === 0 && (
          <ListSkeleton />
        )}
        {props.apiStatus === "finished" && props.eventsPacket.length === 0 && (
          <Errordiv msg="No record found!" cstate className="" />
        )}
      </div>
    </div>
  );
};

export default Browser;
