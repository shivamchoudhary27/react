import React from "react";
import ScheduleTable from "./scheduleTable";

type Props = {
  sessionMode: any;
  courseSession: any;
  userCoursesData: any;
};

const MyScheduleComp = (props: Props) => {
  const currentDate = new Date();
  const options: { day: string; month: string; year: string } = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);

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
          userCoursesData={props.userCoursesData.courses}
        />
      </div>
    </>
  );
};

export default MyScheduleComp;
