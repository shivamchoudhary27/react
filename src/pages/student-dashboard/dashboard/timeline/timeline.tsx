import React from "react";
import { Card } from "react-bootstrap";
import './style.scss';
import TimelineTable from "./timelineTable";

const Timeline = () => {
  return (
    <>
      <Card className="my-2" body>
        <TimelineTable />
      </Card>
    </>
  );
};

export default Timeline;
