import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  user: any;
  modalShow: any;
  timeSlotList: any;
  workloadList: any;
  editComponent: any;
  refreshToggle: any;
  currentUserRole: any;
  toggleModalShow: any;
  currentInstitute: any;
  capitalizeFirstLetter: any;
  profilePic: any
};

const View = (props: Props) => {
  const commonProps = {
    user: props.user,
    profilePic: props.profilePic,
    modalShow: props.modalShow,
    timeSlotList: props.timeSlotList,
    workloadList: props.workloadList,
    refreshToggle: props.refreshToggle,
    editComponent: props.editComponent,
    currentUserRole: props.currentUserRole,
    toggleModalShow: props.toggleModalShow,
    currentInstitute: props.currentInstitute,
    capitalizeFirstLetter: props.capitalizeFirstLetter,
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
