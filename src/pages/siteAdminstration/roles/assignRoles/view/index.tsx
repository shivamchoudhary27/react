import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  userId: any;
  apiStatus: any;
  assignRoles: any;
  btnHideStatus: any;
  getValidateUser: any;
  roleContextDatas: any;
  currentInstitute: any;
  userSelectedEmail: any;
  selectedContextIds: any;
  setUserSelectedEmail: any;
};

const View = (props: Props) => {
  const commonProps = {
    userId: props.userId,
    apiStatus: props.apiStatus,
    assignRoles: props.assignRoles,
    btnHideStatus: props.btnHideStatus,
    getValidateUser: props.getValidateUser,
    roleContextDatas: props.roleContextDatas,
    currentInstitute: props.currentInstitute,
    userSelectedEmail: props.userSelectedEmail,
    selectedContextIds: props.selectedContextIds,
    setUserSelectedEmail: props.setUserSelectedEmail,
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
