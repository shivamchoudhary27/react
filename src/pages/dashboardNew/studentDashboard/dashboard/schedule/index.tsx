import "./style.scss";
import React from "react";
import Mobile from "./view/mobile";
import Browser from "./view/browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  sessionMode: any;
  apiStatus: string;
  courseSession: any;
  userCoursesData: any;
  todaySessionPacket: any;
};

const ScheduleTable: React.FC<Props> = (props) => {

  return (
    <React.Fragment>
      {isMobile ? (
        <Mobile
          apiStatus={props.apiStatus}
          sessionMode={props.sessionMode}
          courseSession={props.courseSession}
          todaySessionPacket={props.todaySessionPacket}
        />
      ) : isDesktop ? (
        <Browser
          apiStatus={props.apiStatus}
          sessionMode={props.sessionMode}
          courseSession={props.courseSession}
          todaySessionPacket={props.todaySessionPacket}
        />
      ) : (
        <Browser
          apiStatus={props.apiStatus}
          sessionMode={props.sessionMode}
          courseSession={props.courseSession}
          todaySessionPacket={props.todaySessionPacket}
        />
      )}
    </React.Fragment>
  );
};

export default ScheduleTable;
