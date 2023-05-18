import React from "react";
import { Card } from "react-bootstrap";
import './style.scss';
import TimelineTable from "./timelineTable";
import FilterDropdown from "./filterDropdown";
// import "~slick-carousel/slick/slick.css"; 
// import "~slick-carousel/slick/slick-theme.css";

const Timeline = () => {
  return (
    <>
      <div className="mitblock timeline-block">
        <h3 className="mitblock-title">
          Activity Timeline
          <FilterDropdown />
        </h3>        
        <TimelineTable />
      </div>
    </>
  );
};

export default Timeline;
