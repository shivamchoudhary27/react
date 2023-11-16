import React from "react";
import ScheduleTable from "./scheduleTable";

type Props = {
  sessionMode: any;
  courseSession: any;
  userCoursesData: any;
  todaySessionPacket: any;
  sessionApiStatus: string;
};

const MyScheduleComp: React.FC<Props> = (props) => {
  const currentDate = new Date();
  const options: { day: string; month: string; year: string } = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate: string = currentDate.toLocaleDateString(
    undefined,
    options
  );

  return (
    <>
      <div className="mitblock todaysession-block">
        <h3 className="mitblock-title">
          Today's session
          <span className="tsb-date">{formattedDate}</span>
        </h3>
        <ScheduleTable
          sessionMode={props.sessionMode}
          courseSession={props.courseSession}
          sessionApiStatus={props.sessionApiStatus}
          todaySessionPacket={props.todaySessionPacket}
          userCoursesData={props.userCoursesData.courses}
        />
      </div>
    </>
  );
};

export default MyScheduleComp;
