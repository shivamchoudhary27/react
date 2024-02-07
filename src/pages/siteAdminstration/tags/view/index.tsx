import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  tagObj: any;
  modalShow: any;
  setTagObj: any;
  apiStatus: any;
  totalpages: any;
  allTagsData: any;
  filterUpdate: any;
  setModalShow: any;
  refreshToggle: any;
  newPageRequest: any;
  toggleModalShow: any;
  editHandlerById: any;
  userAuthorities: any;
  currentInstitute: any;
  updateInputFilters: any;
  updateDeleteRefresh: any;
};

const View = (props: Props) => {
  const commonProps = {
    tagObj: props.tagObj,
    apiStatus: props.apiStatus,
    modalShow: props.modalShow,
    setTagObj: props.setTagObj,
    totalpages: props.totalpages,
    allTagsData: props.allTagsData,
    filterUpdate: props.filterUpdate,
    setModalShow: props.setModalShow,
    refreshToggle: props.refreshToggle,
    newPageRequest: props.newPageRequest,
    toggleModalShow: props.toggleModalShow,
    userAuthorities: props.userAuthorities,
    editHandlerById: props.editHandlerById,
    currentInstitute: props.currentInstitute,
    updateInputFilters: props.updateInputFilters,
    updateDeleteRefresh: props.updateDeleteRefresh,
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
