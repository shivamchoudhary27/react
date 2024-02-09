import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  currentProgram: any;
  instructorsData: any;
  previewTagfields: any;
  previewMetafields: any;
};

const View = (props: Props) => {
  const commonProps = {
    currentProgram: props.currentProgram,
    instructorsData: props.instructorsData,
    previewTagfields: props.previewTagfields,
    previewMetafields: props.previewMetafields,
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
