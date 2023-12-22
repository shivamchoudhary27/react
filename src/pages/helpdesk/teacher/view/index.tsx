import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  onHide: any;
  apiStatus: any;
  modalShow: boolean;
  enquiryData: any[];
  toggleModalShow: any;
  repliesModalShow: boolean;
  toggleRepliesModalShow: any;
  onRepliesHide: any;
  repliesAction: any;
  selectedTopic: any;
  getAllComment: any
  getSelectedTopicId: any
};

const View = (props: Props) => {
  const commonProps = {
    onHide: props.onHide,
    apiStatus:props.apiStatus,
    modalShow: props.modalShow,
    enquiryData: props.enquiryData,
    onRepliesHide: props.onRepliesHide,
    repliesAction: props.repliesAction,
    selectedTopic: props.selectedTopic,
    toggleModalShow: props.toggleModalShow,
    repliesModalShow: props.repliesModalShow,
    toggleRepliesModalShow: props.toggleRepliesModalShow,
    getAllComment: props.getAllComment,
    getSelectedTopicId: props.getSelectedTopicId,
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
