import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  name: any;
  courseid: any;
  programid: any;
  coursename: any;
  groupObj: any;
  modalShow: any;
  apiStatus: any;
  totalPages: any;
  setModalShow: any;
  filterUpdate: any;
  refreshToggle: any;
  newPageRequest: any;
  manageGroupList: any;
  userAuthorities: any;
  editHandlerById: any;
  currentInstitute: any;
  Add_Groups_Btn: any;
  refreshOnDeleteToggle: any;
};

const View = (props: Props) => {
  const commonProps = {
    name: props.name,
    programid: props.programid,
      coursename: props.coursename,
      Add_Groups_Btn: props.Add_Groups_Btn,
    groupObj: props.groupObj,
    courseid: props.courseid,
    modalShow: props.modalShow,
    apiStatus: props.apiStatus,
    totalPages: props.totalPages,
    setModalShow: props.setModalShow,
    filterUpdate: props.filterUpdate,
    refreshToggle: props.refreshToggle,
    newPageRequest: props.newPageRequest,
    userAuthorities: props.userAuthorities,
    editHandlerById: props.editHandlerById,
    manageGroupList: props.manageGroupList,
    currentInstitute: props.currentInstitute,
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
