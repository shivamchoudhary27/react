import "./style.scss";
import Errordiv from "../../../../../widgets/alert/errordiv";
import calendarIcon from "../../../../../assets/images/icons/calendar-black.svg";

type Props = {
  sessionMode: any;
  courseSession: any;
  userCoursesData: any;
};

const ScheduleTable = (props: Props) => {
  const getSessionTime = (sessionDate: number) => {
    const timestamp = sessionDate * 1000;
    const timeZone = "Asia/Kolkata"; // Specify the time zone (Indian Standard Time)

    // Format the date and time in the desired time zone
    const formattedTime = new Date(timestamp)
      .toLocaleString("en-IN", {
        timeZone,
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
      .toLocaleUpperCase();

    // Parse the formatted time to extract hours and minutes
    const [startHour, startMinute] = formattedTime
      .match(/\d+:\d+/)[0]
      .split(":")
      .map((value) => parseInt(value, 10));

    // Calculate the end time by adding 2 hours
    const endHour = (startHour + 2) % 12; // Ensure that the end hour is within 12-hour format
    const endMinute = startMinute;

    // Format the start and end times
    const startTime = `${startHour}:${
      startMinute < 10 ? "0" : ""
    }${startMinute} ${startHour >= 12 ? "PM" : "AM"}`;
    const endTime = `${endHour}:${endMinute < 10 ? "0" : ""}${endMinute} ${
      endHour >= 12 ? "PM" : "AM"
    }`;
    return `${startTime} - ${endTime}`;
  };

  console.log(props.courseSession)

  const getValue = () => {
    console.log(props.userCoursesData.length);
    if (props.userCoursesData.length > 0) {
      // let filteredArray = props.userCoursesData.filter((item: any) => {
      //   return props.courseSession.some((el: any) => el.fullname == item.name);
      // });

      console.log("hello");
    }
    return true;
  };

  return (
    <>
      <div className="mitblock-body">
        {/* {props.apiStatus === "started" && props.courseSession.length === 0 && (
          <ListSkeleton />
        )} */}
        {props.courseSession.map((item: any, index: number) =>
          item.attendance_instances.map((el: any) =>
            el.today_sessions.map((val: any) => (
              // console.log(el)
              <div
                className="d-flex align-items-center tsb-row mb-3"
                key={index}
              >
                <div className="align-self-start me-3">
                  <img src={calendarIcon} alt="Schedule Icon" />
                </div>
                <div className="tsb-info">
                  <h6>
                    {val.name.charAt(0).toUpperCase() + val.name.slice(1)}
                  </h6>
                  <p>
                    <b>Course: </b>
                    {item.fullname}
                  </p>
                  <p>
                    <b>Venue: </b>
                    {val.venue !== "" ? val.venue : "Not available"}
                  </p>
                  <p>{getSessionTime(val.sessdate)}</p>
                </div>
                <span
                  className={`badge tsb-button ${props.sessionMode[val.mode]}`}
                >
                  {props.sessionMode[val.mode].charAt(0).toUpperCase() +
                    props.sessionMode[val.mode].slice(1)}
                </span>
              </div>
            ))
          )
        )}
        {props.courseSession.length === 0 && (
          <Errordiv msg="No session available!" cstate />
        )}
      </div>
    </>
  );
};

export default ScheduleTable;
