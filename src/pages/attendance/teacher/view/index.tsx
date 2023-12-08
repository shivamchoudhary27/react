import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isBrowser } from "react-device-detect";

type Props = {
  dummyData: any[];
};

const View = (props: Props) => {
  const commonProps = {
    dummyData: props.dummyData,
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
