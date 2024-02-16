import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";
// import { useSelector } from "react-redux/es/hooks/useSelector";
import { useSelector } from "react-redux";
import {
  Type_ApiResponse,
  Type_FilterUpdate,
  Type_DepartmentObj,
} from "../type/type";

type Props = {
  // departmentPermission: any;
  apiStatus: string;
  modalShow: boolean;
  currentInstitute: number;
  filterUpdate: Type_FilterUpdate;
  departmentData: Type_ApiResponse;
  departmentObj: Type_DepartmentObj;
  refreshToggle: () => void;
  resetDepartmentForm: () => void;
  newPageRequest: (params: number) => void;
  updateInputFilters: (params: any) => void;
  toggleModalShow: (params: boolean) => void;
  refreshOnDeleteToggle: (params: boolean) => void;
  editHandlerById: (params: Type_DepartmentObj) => void;
};

const View = ({ ...props }: Props) => {
  const departmentPermission = useSelector(
    (state: any) => state.userAuthorities.permissions.department
  );

  const commonProps = {
    modalShow: props.modalShow,
    apiStatus: props.apiStatus,
    filterUpdate: props.filterUpdate,
    departmentObj: props.departmentObj,
    departmentData: props.departmentData,
    currentInstitute: props.currentInstitute,
    departmentPermission: departmentPermission,
    refreshToggle: props.refreshToggle,
    newPageRequest: props.newPageRequest,
    toggleModalShow: props.toggleModalShow,
    editHandlerById: props.editHandlerById,
    updateInputFilters: props.updateInputFilters,
    resetDepartmentForm: props.resetDepartmentForm,
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
