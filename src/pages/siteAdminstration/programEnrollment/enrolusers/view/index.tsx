import React from "react";
import Browser from "./browser";
import Mobile from "./mobile";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  modalShow: any;
  toggleModalShow: any;
  enrolUserHandler: any;
};

const View = (props: Props) => {
  const commonProps = {
    modalShow: props.modalShow,
    toggleModalShow: props.toggleModalShow,
    enrolUserHandler: props.enrolUserHandler,
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
