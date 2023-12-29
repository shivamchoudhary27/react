import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  apiStatus: any;
  newPageRequest: any;
  totalPages: any;
  selectedTopic: any;
  filterUpdate: any;
  helpdeskManagementData: any[];
  toggleRepliesModalShow: any;
  updateTopicFilter: any;
  updateInputFilters: any;
};

const View = (props: Props) => {
  const commonProps = {
    apiStatus: props.apiStatus,
    selectedTopic: props.selectedTopic,
    updateTopicFilter: props.updateTopicFilter,
    updateInputFilters: props.updateInputFilters,
    filterUpdate: props.filterUpdate,
    totalPages: props.totalPages,
    newPageRequest: props.newPageRequest,
    toggleRepliesModalShow: props.toggleRepliesModalShow,
    helpdeskManagementData: props.helpdeskManagementData,
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
