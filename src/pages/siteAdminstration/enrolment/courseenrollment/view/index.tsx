import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  name: any;
  courseid: any;
  totalPages: any;
  programid: any;
  coursename: any;
  filterUpdate: any;
  refreshToggle: any;
  newPageRequest: any;
  uploadModalShow: any;
  setUploadModalShow: any;
  openAddDiscipline: any;
  DISCIPLINE_BUTTONS: any;
  DISCIPLINE_TABLE_COMPONENT: any;
  DISCIPLINE_MODAL_COMPONENT: any;
  remainingSeats:any;
};

const View = (props: Props) => {
  const commonProps = {
    name: props.name,
    courseid: props.courseid,
    programid: props.programid,
    coursename: props.coursename,
    totalPages: props.totalPages,
    filterUpdate: props.filterUpdate,
    refreshToggle: props.refreshToggle,
    remainingSeats: props.remainingSeats,
    newPageRequest: props.newPageRequest,
    uploadModalShow: props.uploadModalShow,
    openAddDiscipline: props.openAddDiscipline,
    setUploadModalShow: props.setUploadModalShow,
    DISCIPLINE_BUTTONS: props.DISCIPLINE_BUTTONS,
    DISCIPLINE_TABLE_COMPONENT: props.DISCIPLINE_TABLE_COMPONENT,
    DISCIPLINE_MODAL_COMPONENT: props.DISCIPLINE_MODAL_COMPONENT,
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
