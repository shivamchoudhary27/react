import Errordiv from "../../../../../../../widgets/alert/errordiv";
import ListSkeleton from "../../../../../../../widgets/skeleton/list";
import calendarIcon from "../../../../../../../assets/images/icons/calendar-black.svg";

type Props = {
  apiStatus: string;
  courseSession: any;
  sessionMode: string[];
};

const Browser = (props: Props) => {
  const currentDate = new Date();
  const options: { day: string; month: string; year: string } = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);

  const getSessionTime = (sessionDate: number) => {
    const timestamp = sessionDate * 1000; // Convert from seconds to milliseconds
    const date = new Date(timestamp);
    const time = date.toLocaleTimeString();
    return time;
  };

  return (
    <div className="mitblock todaysession-block">
      <h3 className="mitblock-title">
        Today's session
        <span className="tsb-date">{formattedDate}</span>
      </h3>
      <div className="mitblock-body">
        {props.courseSession.map((item: any, index: number) =>
          item.attendance_instances.map((el: any) =>
            el.today_sessions.map((val: any) => (
              <div
                className="d-flex align-items-center tsb-row mb-3"
                key={index}
              >
                <div className="align-self-start me-3">
                  <img src={calendarIcon} alt="Schedule Icon" />
                </div>
                <div className="tsb-info">
                  <h6>{el.name.charAt(0).toUpperCase() + val.name.slice(1)}</h6>
                  <p>{item.fullname}</p>
                  {/* <span>{val.venue}</span> */}
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
        {props.apiStatus === "started" && props.courseSession.length === 0 && (
          <ListSkeleton />
        )}
        {props.apiStatus === "finished" && props.courseSession.length === 0 && (
          <Errordiv msg="No record found!" cstate className="" />
        )}
      </div>
    </div>
  );
};

export default Browser;
