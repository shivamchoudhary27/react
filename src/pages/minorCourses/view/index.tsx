import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  onHide: any;
  apiStatus: any;
  modalShow: any;
  totalPages: any;
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
    totalPages: props.totalPages,
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
