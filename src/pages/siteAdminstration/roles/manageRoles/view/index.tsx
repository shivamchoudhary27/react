import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  userObj: any;
  userData: any;
  apiStatus: any;
  modalShow: any;
  refreshToggle: any;
  rolePermissions: any;
  editHandlerById: any;
  toggleModalShow: any;
  openAddRoleModal: any;
  currentInstitute: any;
  addRoleModalShow: any;
  updateSearchFilters: any;
  setAddRoleModalShow: any;
  filterUpdate: any;
  setFilterUpdate:any;
  refreshOnDeleteToggle: any;
};

const View = (props: Props) => {
  const commonProps = {
    userObj: props.userObj,
    userData: props.userData,
    apiStatus: props.apiStatus,
    modalShow: props.modalShow,
    filterUpdate: props.filterUpdate,
    refreshToggle: props.refreshToggle,
    rolePermissions: props.rolePermissions,
    editHandlerById: props.editHandlerById,
    setFilterUpdate: props.setFilterUpdate,
    toggleModalShow: props.toggleModalShow,
    openAddRoleModal: props.openAddRoleModal,
    currentInstitute: props.currentInstitute,
    addRoleModalShow: props.addRoleModalShow,
    updateSearchFilters: props.updateSearchFilters,
    setAddRoleModalShow: props.setAddRoleModalShow,
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
