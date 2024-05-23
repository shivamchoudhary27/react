import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  apiData: any;
  courseId: any;
  StudentData: any;
  getCourseId: any;
  apiStatus: string;
  gradebookData: any;
  setApiStatus: any;
  updateCourses: any;
  currentUserRole: any;
  studentId: any;
  courseName: any;
  statusfilter: any;
  setStatusfilter: any;
  setStudentId: any;
  newPageRequest: any;
  totalPages: any;
  filterUpdate: any;
};

const View = (props: Props) => {
  const commonProps = {
    apiData: props.apiData,
    courseId: props.courseId,
    apiStatus: props.apiStatus,
    StudentData: props.StudentData,
    setApiStatus: props.setApiStatus,
    studentId: props.studentId,
    courseName: props.courseName,
    newPageRequest: props.newPageRequest,
    totalPages: props.totalPages,
    statusfilter: props.statusfilter,
    setStatusfilter: props.setStatusfilter,
    setStudentId: props.setStudentId,
    getCourseId: props.getCourseId,
    gradebookData: props.gradebookData,
    updateCourses: props.updateCourses,
    currentUserRole: props.currentUserRole,
    filterUpdate: props.filterUpdate,
  };
  return (
    <React.Fragment>
      {isMobile ? (
        <Mobile commonProps={commonProps} />
      ) : isDesktop ? (
        <Browser commonProps={commonProps} />
      ) : (
        <Browser commonProps={commonProps} />
      )}
    </React.Fragment>
  );
};

export default View;
