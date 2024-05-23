import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  apiData: any;
  courseId: any;
  getCourseId: any;
  apiStatus: string;
  courseApiStatus: string;
  gradebookData: any;
  updateCourses: any;
  coursesList: any;
  currentUserRole: any;
  statusfilter: any;
  setStatusfilter: any;
};

const View = (props: Props) => {
  const commonProps = {
    apiData: props.apiData,
    courseId: props.courseId,
    coursesList: props.coursesList,
    courseApiStatus: props.courseApiStatus,
    apiStatus: props.apiStatus,
    statusfilter: props.statusfilter,
    setStatusfilter: props.setStatusfilter,
    getCourseId: props.getCourseId,
    gradebookData: props.gradebookData,
    updateCourses: props.updateCourses,
    currentUserRole: props.currentUserRole,
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
