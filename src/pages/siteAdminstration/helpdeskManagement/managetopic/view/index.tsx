import React from "react";
import Browser from "./browser";
import Mobile from "./mobile";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  topicObj: any;
  topicData: any;
  apiStatus: any;
  modalShow: any;
  permissions: any;
  filterUpdate: any;
  topicDataPage: any;
  refreshToggle: any;
  newPageRequest: any;
  editHandlerById: any;
  toggleModalShow: any;
  openAddTopicModal: any;
  refreshOnDeleteToggle: any;
};

const View = (props: Props) => {
  const commonProps = {
    topicObj: props.topicObj,
    topicData: props.topicData,
    apiStatus: props.apiStatus,
    modalShow: props.modalShow,
    topicDataPage: props.topicDataPage,
    permissions: props.permissions,
    filterUpdate: props.filterUpdate,
    refreshToggle: props.refreshToggle,
    newPageRequest: props.newPageRequest,
    editHandlerById: props.editHandlerById,
    toggleModalShow: props.toggleModalShow,
    openAddTopicModal: props.openAddTopicModal,
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
