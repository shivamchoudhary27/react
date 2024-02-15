import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  apiStatus: any;
  totalPages: any;
  programData: any;
  filterUpdate: any;
  refreshToggle: any;
  newPageRequest: any;
  currentInstitute: any;
  programAuthorities: any;
  updateInputFilters: any;
  refreshOnDeleteToggle: any;
  updateDepartmentFilter: any;
};

const View = (props: Props) => {
  const commonProps = {
    apiStatus: props.apiStatus,
    totalPages: props.totalPages,
    programData: props.programData,
    filterUpdate: props.filterUpdate,
    refreshToggle: props.refreshToggle,
    newPageRequest: props.newPageRequest,
    currentInstitute: props.currentInstitute,
    updateInputFilters: props.updateInputFilters,
    programAuthorities: props.programAuthorities,
    refreshOnDeleteToggle: props.refreshOnDeleteToggle,
    updateDepartmentFilter: props.updateDepartmentFilter,
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
