import React from "react";
import Browser from "./browser";
import Mobile from "./mobile";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  apiResponseData: any;
  getCourseId: any
};

const View = (props: Props) => {
  const commonProps = {
    getCourseId: props.getCourseId,
    apiResponseData: props.apiResponseData,
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
