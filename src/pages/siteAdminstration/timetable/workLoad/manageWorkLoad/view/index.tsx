import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  apiStatus: any;
  timeSlotList: any;
  workloadData: any;
  currentInstitute: any;
};

const View = (props: Props) => {
  const commonProps = {
    apiStatus: props.apiStatus,
    timeSlotList: props.timeSlotList,
    workloadData: props.workloadData,
    currentInstitute: props.currentInstitute,
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
