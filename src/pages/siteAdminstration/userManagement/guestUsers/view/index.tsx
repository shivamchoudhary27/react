import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  apiStatus: any;
  modalShow: any;
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
};

const View = (props: Props) => {
  const commonProps = {
    apiStatus: props.apiStatus,
    modalShow: props.modalShow,
    guestUserObj: props.guestUserObj,
    refreshToggle: props.refreshToggle,
    newPageRequest: props.newPageRequest,
    editHandlerById: props.editHandlerById,
    toggleModalShow: props.toggleModalShow,
    instituteList: props.instituteList.items,
    guestUsersData: props.guestUsersData.items,
    filterUpdate: props.filterUpdate,
    updateSearchFilters: props.updateSearchFilters,
    totalPages: props.totalPages,
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
