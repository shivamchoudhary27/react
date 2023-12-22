import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isBrowser } from "react-device-detect";

type Props = {
  getCourseId: any;
  currentUserInfo: any;
  newAttendancePacket: any[];
  apiResponseData: any;
  apiStatus:string
  attendancedata: any
};

const View = (props: Props) => {
  const commonProps = {
    apiStatus:props.apiStatus,
    getCourseId: props.getCourseId,
    currentUserInfo: props.currentUserInfo,
    apiResponseData: props.apiResponseData,
    newAttendancePacket: props.newAttendancePacket,
    attendancedata: props.attendancedata,
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
