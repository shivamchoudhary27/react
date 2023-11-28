import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  modalShow: any;
  apiStatus: any;
  classroomObj: any;
  filterUpdate: any;
  refreshToggle: any;
  newPageRequest: any;
  departmentList: any;
  toggleModalShow: any;
  workLoadApiData: any;
  currentInstitute: any;
  updateInputFilters: any;
  resetClassroomForm: any;
  updateDepartmentFilter: any;
  workLoadApiResponseData: any;
  filterHandlerByDepartment: any;
  workLoadApiResponseDataPage: any;
};

const View = (props: Props) => {
  const commonProps = {
    modalShow: props.modalShow,
    apiStatus: props.apiStatus,
    classroomObj: props.classroomObj,
    filterUpdate: props.filterUpdate,
    refreshToggle: props.refreshToggle,
    newPageRequest: props.newPageRequest,
    departmentList: props.departmentList,
    workLoadApiData: props.workLoadApiData,
    toggleModalShow: props.toggleModalShow,
    currentInstitute: props.currentInstitute,
    updateInputFilters: props.updateInputFilters,
    resetClassroomForm: props.resetClassroomForm,
    updateDepartmentFilter: props.updateDepartmentFilter,
    workLoadApiResponseData: props.workLoadApiResponseData,
    filterHandlerByDepartment: props.filterHandlerByDepartment,
    workLoadApiResponseDataPage: props.workLoadApiResponseDataPage,
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
