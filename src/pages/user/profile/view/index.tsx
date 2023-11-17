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
};

const View = (props: Props) => {
  const commonProps = {
    toggleModalShow: props.toggleModalShow,
    user: props.user,
    capitalizeFirstLetter: props.capitalizeFirstLetter,
    currentUserRole: props.currentUserRole,
    modalShow: props.modalShow,
    timeSlotList: props.timeSlotList,
    editComponent: props.editComponent,
    workloadList: props.workloadList,
    currentInstitute: props.currentInstitute,
    refreshToggle: props.refreshToggle,
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
