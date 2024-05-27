import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  urlArg: any;
  apiStatus: any;
  timeslots: any;
  courseDates: any;
  sortedCategories: any;
  updateCourseDates: any;
  getModalFormData: any;
  toggleModalShow: any;
  modalShow: any;
  modalFormData: any;
  onHide: any;
};

const View = (props: Props) => {
  const commonProps = {
    urlArg: props.urlArg,
    apiStatus: props.apiStatus,
    timeslots: props.timeslots,
    courseDates: props.courseDates,
    sortedCategories: props.sortedCategories,
    updateCourseDates: props.updateCourseDates,
    toggleModalShow: props.toggleModalShow,
    getModalFormData: props.getModalFormData,
    modalShow: props.getModalFormData,
    modalFormData: props.modalFormData,
    onHide: props.onHide,
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
