import Errordiv from "../../../../../../../widgets/alert/errordiv";
import ListSkeleton from "../../../../../../../widgets/skeleton/list";
import calendarIcon from "../../../../../../../assets/images/icons/calendar-black.svg";

type Props = {
  apiStatus: string;
  courseSession: any;
  sessionMode: string[];
  sessionApiStatus: string
  todaySessionPacket: any;
};

const Browser: React.FC<Props> = (props) => {
  const currentDate = new Date();
  const options: { day: string; month: string; year: string } = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);

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
    const startTime = `${startHour}:${startMinute < 10 ? "0" : ""
      }${startMinute} ${startHour >= 12 ? "PM" : "AM"}`;
    const endTime = `${endHour}:${endMinute < 10 ? "0" : ""}${endMinute} ${endHour >= 12 ? "PM" : "AM"
      }`;
    return `${startTime} - ${endTime}`;
  };

  return (
    <div className="mitblock todaysession-block">
      <h3 className="mitblock-title">
        Today's session
        <span className="tsb-date">{formattedDate}</span>
      </h3>
      <div className="mitblock-body">
        {props.todaySessionPacket.map((session: any, index: number) => (
          <div className="d-flex align-items-center tsb-row mb-3" key={index}>
            <div className="align-self-start me-3">
              <img src={calendarIcon} alt="Schedule Icon" />
            </div>
            <div className="tsb-info">
              <h6>
                {session.name.charAt(0).toUpperCase() + session.name.slice(1)}
              </h6>
              <p>
                <b>Course: </b>
                {session.courseName}
              </p>
              <p>
                <b>Venue: </b>
                {session.venue !== "" ? session.venue : "Not available"}
              </p>
              <p>{getSessionTime(session.sessdate)}</p>
            </div>
            <span
              className={`badge tsb-button ${props.sessionMode[session.mode]
                }`}
            >
              {props.sessionMode[session.mode].charAt(0).toUpperCase() +
                props.sessionMode[session.mode].slice(1)}
            </span>
          </div>
        ))}
        {(props.todaySessionPacket.length == 0 &&
          <Errordiv msg="No session available!" cstate className="" />
        )}
      </div>
    </div>
  );
};

export default Browser;
