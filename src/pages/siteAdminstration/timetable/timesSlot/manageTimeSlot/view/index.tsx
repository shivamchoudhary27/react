import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  modalShow: any;
  apiStatus: any;
  nameParams: any;
  timeslotObj: any;
  departmentId: any;
  timeslotList: any;
  filterUpdate: any;
  refreshToggle: any;
  departmentList: any;
  newPageRequest: any;
  editHandlerById: any;
  toggleModalShow: any;
  setFilterUpdate:any;
  timeslotListPage: any;
  currentInstitute: any;
  updateInputFilters: any;
  resetClassroomForm: any;
  refreshOnDeleteToggle: any;
  getInstituteSlotAction: any;
  filterHandlerByDepartment: any;
  updateClassroomFilterByDepartment: any;
};

const View = (props: Props) => {
  const commonProps = {
    modalShow: props.modalShow,
    apiStatus: props.apiStatus,
    nameParams: props.nameParams,
    timeslotObj: props.timeslotObj,
    departmentId: props.departmentId,
    timeslotList: props.timeslotList,
    filterUpdate: props.filterUpdate,
    refreshToggle: props.refreshToggle,
    setFilterUpdate: props.setFilterUpdate,
    departmentList: props.departmentList,
    timeslotListPage: props.timeslotList,
    newPageRequest: props.newPageRequest,
    editHandlerById: props.editHandlerById,
    toggleModalShow: props.toggleModalShow,
    currentInstitute: props.currentInstitute,
    updateInputFilters: props.updateInputFilters,
    resetClassroomForm: props.resetClassroomForm,
    refreshOnDeleteToggle: props.refreshOnDeleteToggle,
    getInstituteSlotAction: props.getInstituteSlotAction,
    filterHandlerByDepartment: props.filterHandlerByDepartment,
    updateClassroomFilterByDepartment: props.updateClassroomFilterByDepartment,
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
