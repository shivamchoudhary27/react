import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
    showModal: any;
    showAllNone: any;
    colorConfig: any;
    filterEvents: any;
    setShowModal: any;
    selectedEvent: any;
    filteredEvents: any;
    CustomEventTitle: any;
    handleSelectEvent: any;
};

const View = (props: Props) => {
  const commonProps = {
    showModal: props.showModal,
    colorConfig: props.colorConfig,
    showAllNone: props.showAllNone,
    setShowModal: props.setShowModal,
    filterEvents: props.filterEvents,
    selectedEvent: props.selectedEvent,
    filteredEvents: props.filteredEvents,
    CustomEventTitle: props.CustomEventTitle,
    handleSelectEvent: props.handleSelectEvent,
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
