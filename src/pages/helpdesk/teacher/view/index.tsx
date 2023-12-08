import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  onHide: any;
  dummyData: any[];
  modalShow: boolean;
  toggleModalShow: any;
  repliesModalShow: boolean;
  toggleRepliesModalShow: any;
  onRepliesHide: any;
  repliesAction: any
};

const View = (props: Props) => {
  const commonProps = {
    onHide: props.onHide,
    dummyData: props.dummyData,
    modalShow: props.modalShow,
    toggleModalShow: props.toggleModalShow,
    repliesModalShow: props.repliesModalShow,
    toggleRepliesModalShow: props.toggleRepliesModalShow,
    onRepliesHide: props.onRepliesHide,
    repliesAction:props.repliesAction
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
