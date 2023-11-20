import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  user: any;
  userid: any;
  modalShow: any;
  timeSlotList: any;
  workloadList: any;
  editComponent: any;
  refreshToggle: any;
  toggleModalShow: any;
  currentInstitute: any;
  capitalizeFirstLetter: any;
  searchCountryNameById: any;
};

const View = (props: Props) => {
  const commonProps = {
    user: props.user,
    userid: props.userid,
    modalShow: props.modalShow,
    timeSlotList: props.timeSlotList,
    workloadList: props.workloadList,
    refreshToggle: props.refreshToggle,
    editComponent: props.editComponent,
    toggleModalShow: props.toggleModalShow,
    currentInstitute: props.currentInstitute,
    capitalizeFirstLetter: props.capitalizeFirstLetter,
    searchCountryNameById: props.searchCountryNameById,
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
