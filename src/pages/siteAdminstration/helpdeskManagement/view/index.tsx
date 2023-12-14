import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {};

const View = (props: Props) => {
    const commonProps = {}
  return (
    <React.Fragment>
      {isMobile ? <Mobile /> : isDesktop ? <Browser /> : <Browser />}
    </React.Fragment>
  );
};

export default View;
