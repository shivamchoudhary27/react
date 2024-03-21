import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  tabTitles: any;
  loading: boolean;
  apiStatus: string;
  toggleRefresh: any
  mailConfigData: any;
  setSelectedTab: any
  initialSubject: string;
  getConfigApiStatus: string;
  initialDescription: string;
};

const View = (props: Props) => {
  const commonProps = {
    loading: props.loading,
    apiStatus: props.apiStatus,
    tabTitles: props.tabTitles,
    mailConfigData: props.mailConfigData,
    initialSubject: props.initialSubject,
    getConfigApiStatus: props.getConfigApiStatus,
    initialDescription: props.initialDescription,
    setSelectedTab: props.setSelectedTab,
    toggleRefresh: props.toggleRefresh,
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
