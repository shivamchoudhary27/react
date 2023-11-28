import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  modalShow: any;
  apiStatus: any;
  refreshToggle: any;
  editHandlerById: any;
  toggleModalShow: any;
  currentInstitute: any;
  instituteTimeSlot: any;
  openInstituteModal: any;
  instituteTimeslotObj: any;
  refreshOnDeleteToggle: any;
};

const View = (props: Props) => {
  const commonProps = {
    modalShow: props.modalShow,
    apiStatus: props.apiStatus,
    refreshToggle: props.refreshToggle,
    editHandlerById: props.editHandlerById,
    toggleModalShow: props.toggleModalShow,
    currentInstitute: props.currentInstitute,
    instituteTimeSlot: props.instituteTimeSlot,
    openInstituteModal: props.openInstituteModal,
    instituteTimeslotObj: props.instituteTimeslotObj,
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
