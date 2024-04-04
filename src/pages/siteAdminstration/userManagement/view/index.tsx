import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  userObj: any;
  userData: any;
  apiStatus: any;
  modalShow: any;
  filterUpdate: any;
  refreshToggle: any;
  setFilterUpdate: any;
  newPageRequest: any;
  toggleModalShow: any;
  editHandlerById: any;
  uploadModalShow: any;
  userAuthorities: any;
  currentInstitute: any;
  openAddUserModal: any;
  toggleUploadModal: any;
  setUploadModalShow: any;
  updateSearchFilters: any;
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
    newPageRequest: props.newPageRequest,
    toggleModalShow: props.toggleModalShow,
    editHandlerById: props.editHandlerById,
    uploadModalShow: props.uploadModalShow,
    userAuthorities: props.userAuthorities,
    currentInstitute: props.currentInstitute,
    openAddUserModal: props.openAddUserModal,
    toggleUploadModal: props.toggleUploadModal,
    setUploadModalShow: props.setUploadModalShow,
    updateSearchFilters: props.updateSearchFilters,
    refreshOnDeleteToggle: props.refreshOnDeleteToggle,
    setFilterUpdate: props.setFilterUpdate
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
