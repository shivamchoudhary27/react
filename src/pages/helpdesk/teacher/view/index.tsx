import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  onHide: any;
  apiStatus: any;
  totalPages: any;
  enquiryData: any;
  filterUpdate: any;
  repliesAction: any;
  selectedTopic: any;
  getAllComment: any;
  modalShow: boolean;
  onRepliesHide: any;
  refreshToggle: any;
  newPageRequest: any;
  toggleModalShow: any;
  selectedTopicId: any;
  setGetAllComment: any;
  updateTopicFilter: any;
  getSelectedTopicId: any;
  updateInputFilters: any;
  selectedProgram: any;
  repliesModalShow: boolean;
  toggleRepliesModalShow: any;
  modalTitle: any
  modalTitleDate:any
};

const View = (props: Props) => {
  const commonProps = {
    onHide: props.onHide,
    apiStatus:props.apiStatus,
    modalShow: props.modalShow,
    totalPages: props.totalPages,
    enquiryData: props.enquiryData,
    filterUpdate: props.filterUpdate,
    selectedTopic: props.selectedTopic,
    refreshToggle: props.refreshToggle,
    repliesAction: props.repliesAction,
    onRepliesHide: props.onRepliesHide,
    getAllComment: props.getAllComment,
    newPageRequest: props.newPageRequest,
    toggleModalShow: props.toggleModalShow,
    selectedTopicId: props.selectedTopicId,
    selectedProgram: props.selectedProgram,
    setGetAllComment: props.setGetAllComment,
    repliesModalShow: props.repliesModalShow,
    updateTopicFilter: props.updateTopicFilter,
    updateInputFilters: props.updateInputFilters,
    getSelectedTopicId: props.getSelectedTopicId,
    toggleRepliesModalShow: props.toggleRepliesModalShow,
    modalTitle: props.modalTitle,
    modalTitleDate: props.modalTitleDate,
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
