import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  apiStatus: any;
  totalpages: any;
  filterUpdate: any;
  setFilterUpdate: any;
  enrollmentData: any;
  newPageRequest: any;
  updateDepartment: any;
  currentInstitute: any;
  updateinputfilters: any;
};

const View = (props: Props) => {
  const commonProps = {
    apiStatus: props.apiStatus,
    totalpages: props.totalpages,
    filterUpdate: props.filterUpdate,
    newPageRequest: props.newPageRequest,
    enrollmentData: props.enrollmentData,
    currentInstitute: props.currentInstitute,
    updateDepartment: props.updateDepartment,
    updateinputfilters: props.updateinputfilters,
    setFilterUpdate: props.setFilterUpdate,
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
