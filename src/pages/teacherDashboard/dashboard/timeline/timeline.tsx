import React from "react";
import { Card } from "react-bootstrap";
import './style.scss';
import TimelineTable from "./timelineTable";
import FilterDropdown from "./filterDropdown";

const Timeline = () => {
  return (
    <>
      <div className="mitblock activityTimeline-block">
        <h3 className="mitblock-title">
          Activity Timeline          
        </h3>
        <FilterDropdown />
        <TimelineTable />
      </div>
    </>
  );
};

export default Timeline;
