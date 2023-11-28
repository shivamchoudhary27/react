import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  apiStatus: any;
  filterUpdate: any;
  departmentList: any;
  newPageRequest: any;
  departmentListPages: any;
};

const View = (props: Props) => {
  const commonProps = {
    apiStatus: props.apiStatus,
    filterUpdate: props.filterUpdate,
    departmentList: props.departmentList,
    newPageRequest: props.newPageRequest,
    departmentListPages: props.departmentListPages,
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
