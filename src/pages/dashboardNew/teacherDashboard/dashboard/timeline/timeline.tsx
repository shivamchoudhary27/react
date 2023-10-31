import React from "react";
import { Card } from "react-bootstrap";
import './style.scss';
import TimelineTable from "./timelineTable";
import FilterDropdown from "./filterDropdown";

type Props = {
  blTimeline: any
  apiStatus: string
}

const Timeline = (props: Props) => {
  return (
    <>
      <div className="mitblock activityTimeline-block">
        <h3 className="mitblock-title">
          Activity Timeline          
        </h3>
        <FilterDropdown blTimeline={props.blTimeline} />
        <TimelineTable blTimeline={props.blTimeline} apiStatus={props.apiStatus} />
      </div>
    </>
  );
};

export default Timeline;
