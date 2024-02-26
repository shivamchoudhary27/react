import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isBrowser } from "react-device-detect";

type Props = {
  totalPages: any;
  newPageRequest: any;
  filterUpdate: any;
  getCourseId: any;
  currentUserInfo: any;
  attendancedata: any[];
  apiResponseData: any;
  apiStatus: string;
  allAttendanceSessionRecords: any;
  totalPointAndPercentage: any;
};

const View = (props: Props) => {
  const commonProps = {
    getCourseId: props.getCourseId,
    attendancedata: props.attendancedata,
    currentUserInfo: props.currentUserInfo,
    apiResponseData: props.apiResponseData,
    apiStatus: props.apiStatus,
    allAttendanceSessionRecords: props.allAttendanceSessionRecords,
    totalPointAndPercentage: props.totalPointAndPercentage,
    totalPages: props.totalPages,
    newPageRequest: props.newPageRequest,
    filterUpdate: props.filterUpdate,
  };
  return (
    <React.Fragment>
      {isMobile ? (
        <Mobile commonProps={commonProps} />
      ) : isBrowser ? (
        <Browser commonProps={commonProps} />
      ) : (
        <Browser commonProps={commonProps} />
      )}
    </React.Fragment>
  );
};

export default View;
