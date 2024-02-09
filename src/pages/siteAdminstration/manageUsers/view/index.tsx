import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  apiStatus: any;
  programid: any;
  programId: any;
  modalShow: any;
  totalpages: any;
  programname: any;
  usersDataObj: any;
  filterUpdate: any;
  refreshToggle: any;
  newPageRequest: any;
  usersModalShow: any;
  toggleModalShow: any;
  editHandlerById: any;
  enrolleduserdata: any;
  currentInstitute: any;
  AddUsersModalShow: any;
  updateinputfilters: any;
  refreshOnDeleteToggle: any;
};

const View = (props: Props) => {
  const commonProps = {
    apiStatus: props.apiStatus,
    programid: props.programid,
    programId: props.programId,
    modalShow: props.modalShow,
    totalpages: props.totalpages,
    programname: props.programname,
    filterUpdate: props.filterUpdate,
    usersDataObj: props.usersDataObj,
    refreshToggle: props.refreshToggle,
    newPageRequest: props.newPageRequest,
    usersModalShow: props.usersModalShow,
    editHandlerById: props.editHandlerById,
    toggleModalShow: props.toggleModalShow,
    enrolleduserdata: props.enrolleduserdata,
    currentInstitute: props.currentInstitute,
    AddUsersModalShow: props.AddUsersModalShow,
    updateinputfilters: props.updateinputfilters,
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
