import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isBrowser } from "react-device-detect";

type Props = {
  getCourseId: any;
  currentUserInfo: any;
  attendancedata: any[];
  apiResponseData: any;
};

const View = (props: Props) => {
  const commonProps = {
    getCourseId: props.getCourseId,
    attendancedata: props.attendancedata,
    currentUserInfo: props.currentUserInfo,
    apiResponseData: props.apiResponseData,
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
