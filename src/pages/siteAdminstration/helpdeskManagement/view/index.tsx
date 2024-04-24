import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  onHide: any;
    topicObj: any;
    queryObj: any;
    apiStatus: any;
    modalShow: any;
    totalPages: any;
    modalTitle: any;
    onQueryHide: any;
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
    filterUpdateTable:any;
    repliesModalShow: any;
    updateTopicFilter: any;
    getSelectedTopicId: any;
    editHandlerByQueryId: any;
    toggleQueryModalShow: any;
    toggleRepliesModalShow: any;
    helpdeskManagementData: any[];
    setGetAllComment:any;
    alertMsg:any;
    setAlertMsg:any;
    showAlert: any;
    setShowAlert:any;
};

const View = (props: Props) => {
  const commonProps = {
    onHide: props.onHide,
    queryObj:props.queryObj,
    alertMsg: props.alertMsg,
    setAlertMs: props.setAlertMsg,
    topicObj: props.topicObj,
    apiStatus: props.apiStatus,
    modalShow: props.modalShow,
    showAlert: props.showAlert,
    modalTitle: props.modalTitle,
    totalPages: props.totalPages,
    onQueryHide: props.onQueryHide,
    setShowAlert: props.setShowAlert,
    filterUpdate: props.filterUpdate,
    selectedTopic: props.selectedTopic,
    getAllComment: props.getAllComment,
    refreshToggle: props.refreshToggle,
    setGetAllComment:props.setGetAllComment,
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
    filterUpdateTable:props.filterUpdateTable,
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
