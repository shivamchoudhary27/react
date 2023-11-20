import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  roleId: any;
  roleName: any;
  apiStatus: any;
  permissionData: any;
  rolePermissions: any;
};

const View = (props: Props) => {
  const commonProps = {
    roleId: props.roleId,
    roleName: props.roleName,
    apiStatus: props.apiStatus,
    permissionData: props.permissionData,
    rolePermissions: props.rolePermissions,
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
