import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  apiStatus: any;
  filterUpdate: any;
  timeTableData: any;
  totalPages: any;
  newPageRequest: any;
  editHandlerById: any;
  currentInstitute: any;
  updateInputFilters: any;
  refreshOnDeleteToggle: any;
};

const View = (props: Props) => {
  const commonProps = {
    apiStatus: props.apiStatus,
    filterUpdate: props.filterUpdate,
    totalPages: props.totalPages,
    timeTableData: props.timeTableData,
    newPageRequest: props.newPageRequest,
    editHandlerById: props.editHandlerById,
    currentInstitute: props.currentInstitute,
    updateInputFilters: props.updateInputFilters,
    refreshOnDeleteToggle: props.refreshOnDeleteToggle,
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
