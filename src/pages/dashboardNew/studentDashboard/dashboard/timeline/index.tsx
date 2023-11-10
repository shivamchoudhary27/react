import "./style.scss";
import React from "react";
import Mobile from "./view/mobile";
import Browser from "./view/browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  // apiStatus: any;
  // eventsPacket: any;
  // showAlert: boolean;
  // getFilterSelectValue: any;
  // filterTimestampValue: string;
  // getSortFilterValue: any;
  // filterTimestampSort: string;
  // courseFilterActive: boolean
  
  eventsPacket: any;
  apiStatus: string;
  showAlert: boolean;
  getSortFilterValue: any;
  apiStatusCourse: string;
  getFilterSelectValue: any;
  courseFilterActive: boolean;
  filterTimestampSort: string;
  filterTimestampValue: string;
};

const Timeline: React.FC<Props> = (props) => {

  return (
    <React.Fragment>
      {isMobile ? (
        <Mobile
          // showAlert={props.showAlert}
          // apiStatus={props.apiStatus}
          // eventsPacket={props.eventsPacket}
          // getTimetableTime={getTimetableTime}
          // formatDynamicTimestamp={formatDynamicTimestamp}

          apiStatus={props.apiStatus}
          showAlert={props.showAlert}
          eventsPacket={props.eventsPacket}
          apiStatusCourse={props.apiStatusCourse}
          getFilterSelectValue={props.getFilterSelectValue}
          courseFilterActive={props.courseFilterActive}
          filterTimestampValue={props.filterTimestampValue}
          getSortFilterValue={props.getSortFilterValue}
          filterTimestampSort={props.filterTimestampSort}
        />
      ) : isDesktop ? (
        <Browser
          // showAlert={props.showAlert}
          // apiStatus={props.apiStatus}
          // eventsPacket={props.eventsPacket}
          // getTimetableTime={getTimetableTime}
          // formatDynamicTimestamp={formatDynamicTimestamp}
          // getFilterSelectValue={props.getFilterSelectValue}
          // filterTimestampValue={props.filterTimestampValue}
          // getSortFilterValue={props.getSortFilterValue}
          // filterTimestampSort={props.filterTimestampSort}
          // courseFilterActive={props.courseFilterActive}

          apiStatus={props.apiStatus}
          showAlert={props.showAlert}
          eventsPacket={props.eventsPacket}
          apiStatusCourse={props.apiStatusCourse}
          getFilterSelectValue={props.getFilterSelectValue}
          courseFilterActive={props.courseFilterActive}
          filterTimestampValue={props.filterTimestampValue}
          getSortFilterValue={props.getSortFilterValue}
          filterTimestampSort={props.filterTimestampSort}
        />
      ) : (
        <Browser
          // showAlert={props.showAlert}
          // apiStatus={props.apiStatus}
          // eventsPacket={props.eventsPacket}
          // getTimetableTime={getTimetableTime}
          // formatDynamicTimestamp={formatDynamicTimestamp}
          // getFilterSelectValue={props.getFilterSelectValue}
          // filterTimestampValue={props.filterTimestampValue}
          // getSortFilterValue={props.getSortFilterValue}
          // filterTimestampSort={props.filterTimestampSort}
          // courseFilterActive={props.courseFilterActive}

          apiStatus={props.apiStatus}
          showAlert={props.showAlert}
          eventsPacket={props.eventsPacket}
          apiStatusCourse={props.apiStatusCourse}
          getFilterSelectValue={props.getFilterSelectValue}
          courseFilterActive={props.courseFilterActive}
          filterTimestampValue={props.filterTimestampValue}
          getSortFilterValue={props.getSortFilterValue}
          filterTimestampSort={props.filterTimestampSort}
        />
      )}
    </React.Fragment>
  );
};

export default Timeline;
