import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  onHide: any;
    topicObj: any;
    apiStatus: any;
    modalShow: any;
    totalPages: any;
    modalTitle: any;
    filterUpdate: any;
    getAllComment: any;
    refreshToggle: any;
    selectedTopic: any;
    onRepliesHide: any;
    repliesAction: any;
    newPageRequest: any;
    modalTitleDate: any;
    editHandlerById: any;
    toggleModalShow: any;
    selectedTopicId: any;
    repliesModalShow: any;
    updateTopicFilter: any;
    updateInputFilters: any;
    getSelectedTopicId: any;
    toggleRepliesModalShow: any;
    helpdeskManagementData: any[];
};

const View = (props: Props) => {
  const commonProps = {
    onHide: props.onHide,
    topicObj: props.topicObj,
    apiStatus: props.apiStatus,
    modalShow: props.modalShow,
    modalTitle: props.modalTitle,
    totalPages: props.totalPages,
    filterUpdate: props.filterUpdate,
    selectedTopic: props.selectedTopic,
    getAllComment: props.getAllComment,
    refreshToggle: props.refreshToggle,
    onRepliesHide: props.onRepliesHide,
    repliesAction: props. repliesAction,
    newPageRequest: props.newPageRequest,
    modalTitleDate: props.modalTitleDate,
    toggleModalShow: props.toggleModalShow,
    selectedTopicId: props.selectedTopicId,
    editHandlerById: props.editHandlerById,
    repliesModalShow: props.repliesModalShow,
    updateTopicFilter: props.updateTopicFilter,
    updateInputFilters: props.updateInputFilters,
    getSelectedTopicId: props.getSelectedTopicId,
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
