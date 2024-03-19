import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  onHide: any;
  apiStatus: any;
  modalShow: any;
  totalPages: any;
  isEnrolled: any;
  isWaitlisted: any;
  filterUpdate: any;
  refreshToggle: any;
  newPageRequest: any;
  minorcourseObj: any;
  toggleModalShow: any;
  minorCourseData: any;
  editHandlerById: any;
};

const View = (props: Props) => {
  const commonProps = {
    onHide: props.onHide,
    apiStatus: props.apiStatus,
    modalShow: props.modalShow,
    isEnrolled: props.isEnrolled,
    totalPages: props.totalPages,
    isWaitlisted: props.isWaitlisted,
    filterUpdate: props.filterUpdate,
    refreshToggle: props.refreshToggle,
    minorcourseObj: props.minorcourseObj,
    newPageRequest: props.newPageRequest,
    toggleModalShow: props.toggleModalShow,
    minorCourseData: props.minorCourseData,
    editHandlerById: props.editHandlerById,

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
