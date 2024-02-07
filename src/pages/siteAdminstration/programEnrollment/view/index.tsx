import React from "react";
import Browser from "../../programEnrollment/view/browser";
import Mobile from "../../programEnrollment/view/mobile";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  apiStatus: any;
  totalpages: any;
  filterUpdate: any;
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
