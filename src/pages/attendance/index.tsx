import React from "react";
import { useSelector } from "react-redux";
import StudentAttendance from "./student";
import TeacherAttendance from "./teacher";

type Props = {};

const Attendance = (props: Props) => {
  const currentUserRole = useSelector(
    (state) => state.globalFilters.currentUserRole
  );
  return (
    <React.Fragment>
      {currentUserRole.shortName === "student" ? (
        <StudentAttendance />
      ) : (
        <TeacherAttendance />
      )}
    </React.Fragment>
  );
};

export default Attendance;
