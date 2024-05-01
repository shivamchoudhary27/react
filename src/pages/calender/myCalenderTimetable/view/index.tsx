import React from "react";
import Browser from "./browser";
import Mobile from "./mobile";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  getCourseId: any
  apiResponseData: any;
  timeslots: any;
  apiStatus: any;
  courseDates: any;
  selectedMonth: any;
  updateTimetableDates: any;
  dpt: any;
  prg: any;
  prgId: any;
};

const View = (props: Props) => {
  const commonProps = {
    getCourseId: props.getCourseId,
    apiResponseData: props.apiResponseData,
    timeslots: props.timeslots,
    apiStatus: props.apiStatus,
    courseDates: props.courseDates,
    selectedMonth: props.selectedMonth,
    updateTimetableDates: props.updateTimetableDates,
    dpt: props.dpt,
  prg: props.prg,
  prgId:  props.prgId,

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
