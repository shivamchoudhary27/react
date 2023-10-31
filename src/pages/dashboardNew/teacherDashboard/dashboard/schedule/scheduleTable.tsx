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
    const timestamp = sessionDate * 1000; // Convert from seconds to milliseconds
    const date = new Date(timestamp);
    const time = date.toLocaleTimeString();
    return time;
  };

  const getValue = () => {
    console.log(props.userCoursesData.length)
    if (props.userCoursesData.length > 0) {
      let filteredArray = props.userCoursesData.filter((item: any) => {
        return props.courseSession.some((el: any) => el.fullname == item.name);
      });
    
      console.log(filteredArray);
    }
    return true;
  };

  return (
    <>
      <div className="mitblock-body">
        {getValue() &&
          props.courseSession.length > 0 &&
          props.courseSession.map((item: any, index: number) =>
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
                    <h6>
                      {el.name.charAt(0).toUpperCase() + el.name.slice(1)}
                    </h6>
                    <p>{item.fullname}</p>
                    {/* <p>{val.venue}</p> */}
                    <p>{getSessionTime(val.sessdate)}</p>
                  </div>
                  <span
                    className={`badge tsb-button ${
                      props.sessionMode[val.mode]
                    }`}
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
