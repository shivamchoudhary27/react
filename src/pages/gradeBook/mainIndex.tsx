import React from "react";
import { useSelector } from "react-redux";
import StudentGradeBook from "./studentGradeBook/index";
import TeacherGradeBook from "./teacherGradeBook/index";

const GradeBook = () => {
  const currentUserRole = useSelector(
    (state) => state.globalFilters.currentUserRole
  );

  return (
    <React.Fragment>
      {currentUserRole.shortName === "student" ? (
        <>
          <StudentGradeBook />
        </>
      ) : (
        <>
          <TeacherGradeBook />
        </>
      )}
    </React.Fragment>
  );
};

export default GradeBook;
