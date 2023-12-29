import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  onHide: any;
  apiStatus: any;
  modalShow: boolean;
  totalPages: any;
  enquiryData: any;
  filterUpdate: any;
  newPageRequest: any;
  // uniqueEnquiryData: any;
  toggleModalShow: any;
  repliesModalShow: boolean;
  selectedTopicId: any;
  setGetAllComment: any;
  toggleRepliesModalShow: any;
  onRepliesHide: any;
  repliesAction: any;
  selectedTopic: any;
  getAllComment: any;
  getSelectedTopicId: any;
  updateInputFilters: any;
  updateTopicFilter: any;
};

const View = (props: Props) => {
  const commonProps = {
    onHide: props.onHide,
    apiStatus:props.apiStatus,
    enquiryData: props.enquiryData,
    modalShow: props.modalShow,
    filterUpdate: props.filterUpdate,
    newPageRequest: props.newPageRequest,
    selectedTopicId: props.selectedTopicId,
    setGetAllComment: props.setGetAllComment,
    updateTopicFilter: props.updateTopicFilter,
    updateInputFilters: props.updateInputFilters,
    // uniqueEnquiryData: props.uniqueEnquiryData,
    totalPages: props.totalPages,
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
