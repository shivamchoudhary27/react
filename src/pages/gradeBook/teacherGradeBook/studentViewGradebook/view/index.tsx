import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  StudentData: any;
  setStudentId: any;
  userId: any;
  setstatusfilter: any;
  studentId: any;
  statusfilter: any;
  apiStatus: any;
  courseName: any;

};

const View = (props: Props) => {
  const commonProps = {
    StudentData: props.StudentData,
    setStudentId: props.setStudentId,
    userId: props.userId,
    setstatusfilter: props.setstatusfilter,
    studentId: props.studentId,
    statusfilter: props.statusfilter,
    apiStatus: props.apiStatus,
    courseName: props.courseName,
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
