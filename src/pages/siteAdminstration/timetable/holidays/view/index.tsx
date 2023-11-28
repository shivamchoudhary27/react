import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  modalShow: any;
  apiStatus: any;
  holidaysObj: any;
  yearOptions: any;
  filterUpdate: any;
  holidaysData: any;
  refreshToggle: any;
  newPageRequest: any;
  toggleModalShow: any;
  editHandlerById: any;
  currentInstitute: any;
  resetHolidaysForm: any;
  updateInputFilters: any;
  getCurrentBatchYear: any;
  refreshOnDeleteToggle: any;
  holidaysApiResponseData: any;
  filterHandlerByDepartment: any;
  updateHolidaysFilterByYear: any;
};

const View = (props: Props) => {
  const commonProps = {
    modalShow: props.modalShow,
    apiStatus: props.apiStatus,
    holidaysObj: props.holidaysObj,
    yearOptions: props.yearOptions,
    holidaysData: props.holidaysData,
    filterUpdate: props.filterUpdate,
    refreshToggle: props.refreshToggle,
    newPageRequest: props.newPageRequest,
    toggleModalShow: props.toggleModalShow,
    editHandlerById: props.editHandlerById,
    currentInstitute: props.currentInstitute,
    resetHolidaysForm: props.resetHolidaysForm,
    updateInputFilters: props.updateInputFilters,
    getCurrentBatchYear: props.getCurrentBatchYear,
    refreshOnDeleteToggle: props.refreshOnDeleteToggle,
    holidaysApiResponseData: props.holidaysApiResponseData,
    filterHandlerByDepartment: props.filterHandlerByDepartment,
    updateHolidaysFilterByYear: props.updateHolidaysFilterByYear,
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
