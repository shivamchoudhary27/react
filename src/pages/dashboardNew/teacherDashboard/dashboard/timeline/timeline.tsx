import "./style.scss";
import React from "react";
import { Card } from "react-bootstrap";
import TimelineTable from "./timelineTable";
import FilterDropdown from "./filterDropdown";

type Props = {
  apiStatus: string;
  blTimelineEvent: any;
};

const Timeline = (props: Props) => {
  return (
    <>
      <div className="mitblock activityTimeline-block">
        <h3 className="mitblock-title">Activity Timeline</h3>
        <FilterDropdown blTimelineEvent={props.blTimelineEvent} />
        <TimelineTable
          apiStatus={props.apiStatus}
          blTimelineEvent={props.blTimelineEvent}
        />
      </div>
    </>
  );
};

export default Timeline;
