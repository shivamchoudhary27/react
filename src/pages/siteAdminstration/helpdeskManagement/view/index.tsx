import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  apiStatus: any;
  totalPages: any;
  filterUpdate: any;
  selectedTopic: any;
  newPageRequest: any;
  updateTopicFilter: any;
  updateInputFilters: any;
  refreshToggle: any;
  helpdeskManagementData: any[];
  modalShow: any,
  toggleModalShow: any,
  onHide: any,
  topicObj: any,
  editHandlerById: any,
};

const View = (props: Props) => {
  const commonProps = {
    topicObj: props.topicObj,
    editHandlerById: props.editHandlerById,
    apiStatus: props.apiStatus,
    refreshToggle: props.refreshToggle,
    totalPages: props.totalPages,
    filterUpdate: props.filterUpdate,
    selectedTopic: props.selectedTopic,
    newPageRequest: props.newPageRequest,
    updateTopicFilter: props.updateTopicFilter,
    updateInputFilters: props.updateInputFilters,
    helpdeskManagementData: props.helpdeskManagementData,
    modalShow: props.modalShow,
    toggleModalShow: props.toggleModalShow,
    onHide: props.onHide,


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
