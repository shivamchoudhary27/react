import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  apiStatus: any;
  totalPages: any;
  filterUpdate: any;
  refreshToggle: any;
  selectedTopic: any;
  newPageRequest: any;
  updateTopicFilter: any;
  updateInputFilters: any;
  helpdeskManagementData: any[];
};

const View = (props: Props) => {
  const commonProps = {
    apiStatus: props.apiStatus,
    totalPages: props.totalPages,
    filterUpdate: props.filterUpdate,
    selectedTopic: props.selectedTopic,
    newPageRequest: props.newPageRequest,
    updateTopicFilter: props.updateTopicFilter,
    updateInputFilters: props.updateInputFilters,
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
