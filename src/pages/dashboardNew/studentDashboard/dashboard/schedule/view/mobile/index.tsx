import Errordiv from "../../../../../../widgets/alert/errordiv";
import calendarIcon from "../../../../../../assets/images/icons/calendar-black.svg";

type Props = {
    currentDate: string,
    courseSession: any,
    sessionMode: string[]
};

const Mobile = ({currentDate, courseSession, sessionMode}: Props) => {
  return (
    <div className="mitblock todaysession-block">
      <h3 className="mitblock-title">
        Today's session
        <span className="tsb-date">{currentDate}</span>
      </h3>
      <div className="mitblock-body">
        {courseSession.map((item: any, index: number) =>
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
                    {val.name.charAt(0).toUpperCase() + val.name.slice(1)}
                  </h6>
                  <p>{el.name}</p>
                  <span>{val.venue}</span>
                </div>
                <span className={`badge tsb-button ${sessionMode[val.mode]}`}>
                  {sessionMode[val.mode].charAt(0).toUpperCase() +
                    sessionMode[val.mode].slice(1)}
                </span>
              </div>
            ))
          )
        )}
        {courseSession.length === 0 && (
          <Errordiv msg="No session available!" cstate />
        )}
      </div>
    </div>
  );
};

export default Mobile;
