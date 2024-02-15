import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  userid: any;
  currentInstitute: any;
  initialValues: any;
};

const View = (props: Props) => {
  const commonProps = {
    userid: props.userid,
    initialValues: props.initialValues,
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
