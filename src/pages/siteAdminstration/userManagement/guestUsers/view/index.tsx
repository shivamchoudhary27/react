import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  apiStatus: any;
  onHide: any;
  modalShow: any;
  activepage: any;
  totalPages: any;
  filterUpdate: any;
  guestUserObj: any;
  refreshToggle: any;
  instituteList: any;
  guestUsersData: any;
  newPageRequest: any;
  editHandlerById: any;
  toggleModalShow: any;
  updateSearchFilters: any;
  refreshOnDeleteToggle: any;
  setGuestUserObj: any
};

const View = (props: Props) => {
  const commonProps = {
    onHide: props.onHide,
    apiStatus: props.apiStatus,
    modalShow: props.modalShow,
    totalPages: props.totalPages,
    activepage: props.activepage,
    guestUserObj: props.guestUserObj,
    filterUpdate: props.filterUpdate,
    instituteList: props.instituteList,
    refreshToggle: props.refreshToggle,
    guestUsersData: props.guestUsersData,
    newPageRequest: props.newPageRequest,
    editHandlerById: props.editHandlerById,
    toggleModalShow: props.toggleModalShow,
    updateSearchFilters: props.updateSearchFilters,
    refreshOnDeleteToggle: props.refreshOnDeleteToggle,
    setGuestUserObj: props.setGuestUserObj,
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
