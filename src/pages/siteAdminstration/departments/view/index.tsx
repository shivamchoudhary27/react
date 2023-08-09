import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import {
  TypeDummyData,
  TypeDepartmentObj,
  TypeModalShow,
  TypeRefreshData,
  TypeRefreshOnDelete,
  TypeApiStatus,
  CurrentInstitute,
  TypeFilterUpdate,
} from "../types/type";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  departmentData: TypeDummyData;
  editHandlerById: TypeDepartmentObj;
  toggleModalShow: TypeModalShow;
  departmentObj: TypeDepartmentObj;
  refreshToggle: TypeRefreshData;
  resetDepartmentForm: any;
  refreshOnDeleteToggle: TypeRefreshOnDelete;
  apiStatus: TypeApiStatus;
  currentInstitute: CurrentInstitute;
  modalShow: TypeModalShow;
  // departmentPermission: any;
  updateInputFilters: any;
  filterUpdate: TypeFilterUpdate;
  newPageRequest: any;
};

const View = ({ ...props }: Props) => {
  const departmentPermission = useSelector(
    (state: any) => state.userAuthorities.permissions.department
  );

  const commonProps = {
    departmentData: props.departmentData,
    editHandlerById: props.editHandlerById,
    toggleModalShow: props.toggleModalShow,
    departmentObj: props.departmentObj,
    refreshToggle: props.refreshToggle,
    resetDepartmentForm: props.resetDepartmentForm,
    refreshOnDeleteToggle: props.refreshOnDeleteToggle,
    apiStatus: props.apiStatus,
    currentInstitute: props.currentInstitute,
    modalShow: props.modalShow,
    departmentPermission: departmentPermission,
    updateInputFilters: props.updateInputFilters,
    filterUpdate: props.filterUpdate,
    newPageRequest: props.newPageRequest,
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
