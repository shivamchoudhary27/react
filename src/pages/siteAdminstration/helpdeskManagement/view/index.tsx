import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  onHide: any;
  alertMsg: any;
  topicObj: any;
  showAlert: any;
  queryObj: any;
  apiStatus: any;
  modalShow: any;
  totalPages: any;
  modalTitle: any;
  onQueryHide: any;
  setAlertMsg: any;
  setShowAlert: any;
  filterUpdate: any;
  getAllProgram: any;
  getAllComment: any;
  refreshToggle: any;
  selectedTopic: any;
  onRepliesHide: any;
  repliesAction: any;
  queryModalShow: any;
  newPageRequest: any;
  modalTitleDate: any;
  setFilterUpdate: any;
  editHandlerById: any;
  toggleModalShow: any;
  selectedTopicId: any;
  setGetAllComment: any;
  repliesModalShow: any;
  filterUpdateTable: any;
  updateTopicFilter: any;
  getSelectedTopicId: any;
  editHandlerByQueryId: any;
  toggleQueryModalShow: any;
  toggleRepliesModalShow: any;
  helpdeskManagementData: any[];
};

const View = (props: Props) => {
  const commonProps = {
    onHide: props.onHide,
    queryObj: props.queryObj,
    alertMsg: props.alertMsg,
    topicObj: props.topicObj,
    apiStatus: props.apiStatus,
    modalShow: props.modalShow,
    showAlert: props.showAlert,
    modalTitle: props.modalTitle,
    totalPages: props.totalPages,
    setAlertMs: props.setAlertMsg,
    onQueryHide: props.onQueryHide,
    setShowAlert: props.setShowAlert,
    filterUpdate: props.filterUpdate,
    selectedTopic: props.selectedTopic,
    getAllComment: props.getAllComment,
    refreshToggle: props.refreshToggle,
    onRepliesHide: props.onRepliesHide,
    getAllProgram: props.getAllProgram,
    repliesAction: props.repliesAction,
    queryModalShow: props.queryModalShow,
    newPageRequest: props.newPageRequest,
    modalTitleDate: props.modalTitleDate,
    setFilterUpdate: props.setFilterUpdate,
    toggleModalShow: props.toggleModalShow,
    selectedTopicId: props.selectedTopicId,
    editHandlerById: props.editHandlerById,
    repliesModalShow: props.repliesModalShow,
    setGetAllComment: props.setGetAllComment,
    filterUpdateTable: props.filterUpdateTable,
    updateTopicFilter: props.updateTopicFilter,
    getSelectedTopicId: props.getSelectedTopicId,
    editHandlerByQueryId: props.editHandlerByQueryId,
    toggleQueryModalShow: props.toggleQueryModalShow,
    helpdeskManagementData: props.helpdeskManagementData,
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
