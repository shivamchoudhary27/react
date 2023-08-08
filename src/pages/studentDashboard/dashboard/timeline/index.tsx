import React from "react";
import "./style.scss";
// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";
import Browser from "./view/browser";
import Mobile from "./view/mobile";
import { isMobile, isDesktop } from "react-device-detect";

const Timeline = () => {
  return (
    <React.Fragment>
      {isMobile ? <Mobile /> : isDesktop ? <Browser /> : <Browser />}
    </React.Fragment>
  );
};

export default Timeline;
