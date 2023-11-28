import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  userObj: any;
  userData: any;
  apiStatus: any;
  modalShow: any;
  permissions: any;
  configModal: any;
  filterUpdate: any;
  userDataPage: any;
  refreshToggle: any;
  newPageRequest: any;
  uploadModalShow: any;
  editHandlerById: any;
  toggleModalShow: any;
  configModalShow: any;
  permissionsView: any;
  openAddUserModal: any;
  editConfigHandler: any;
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
    userDataPage: props.userData,
    permissions: props.permissions,
    configModal: props.configModal,
    filterUpdate: props.filterUpdate,
    refreshToggle: props.refreshToggle,
    newPageRequest: props.newPageRequest,
    permissionsView:props.permissionsView,
    uploadModalShow: props.uploadModalShow,
    editHandlerById: props.editHandlerById,
    toggleModalShow: props.toggleModalShow,
    configModalShow: props.configModalShow,
    openAddUserModal: props.openAddUserModal,
    editConfigHandler: props.editConfigHandler,
    toggleUploadModal: props.toggleUploadModal,
    setUploadModalShow: props.setUploadModalShow,
    updateSearchFilters: props.updateSearchFilters,
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
