import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  onHide: any;
  alertMsg:any;
  apiStatus: any;
  showAlert: any;
  modalTitle: any;
  setAlertMsg:any;
  totalPages: any;
  setShowAlert:any;
  enquiryData: any;
  filterUpdate: any;
  modalTitleDate:any;
  repliesAction: any;
  selectedTopic: any;
  getAllComment: any;
  modalShow: boolean;
  onRepliesHide: any;
  refreshToggle: any;
  newPageRequest: any;
  setFilterUpdate: any;
  toggleModalShow: any;
  selectedTopicId: any;
  setGetAllComment:any;
  selectedProgram: any;
  updateTopicFilter: any;
  getSelectedTopicId: any;
  repliesModalShow: boolean;
  toggleRepliesModalShow: any;
};

const View = (props: Props) => {
  const commonProps = {
    onHide: props.onHide,
    alertMsg: props.alertMsg,
    apiStatus:props.apiStatus,
    modalShow: props.modalShow,
    showAlert: props.showAlert,
    modalTitle: props.modalTitle,
    totalPages: props.totalPages,
    setAlertMs: props.setAlertMsg,
    enquiryData: props.enquiryData,
    filterUpdate: props.filterUpdate,
    setShowAlert: props.setShowAlert,
    selectedTopic: props.selectedTopic,
    refreshToggle: props.refreshToggle,
    repliesAction: props.repliesAction,
    onRepliesHide: props.onRepliesHide,
    getAllComment: props.getAllComment,
    newPageRequest: props.newPageRequest,
    modalTitleDate: props.modalTitleDate,
    setFilterUpdate: props.setFilterUpdate,
    toggleModalShow: props.toggleModalShow,
    selectedTopicId: props.selectedTopicId,
    selectedProgram: props.selectedProgram,
    setGetAllComment:props.setGetAllComment,
    repliesModalShow: props.repliesModalShow,
    updateTopicFilter: props.updateTopicFilter,
    getSelectedTopicId: props.getSelectedTopicId,
    toggleRepliesModalShow: props.toggleRepliesModalShow,
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
