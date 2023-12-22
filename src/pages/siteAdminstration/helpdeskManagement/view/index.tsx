import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  apiStatus:any;
  helpdeskManagementData: any[];
  toggleRepliesModalShow:any;
};

const View = (props: Props) => {
    const commonProps = {
      apiStatus:props.apiStatus,
      toggleRepliesModalShow: props.toggleRepliesModalShow,
      helpdeskManagementData: props.helpdeskManagementData,
    }
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
