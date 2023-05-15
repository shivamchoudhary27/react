import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import TabData from "./tabData";

const ProgramTabs = () => {
  return (
    <React.Fragment>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="objectives" title="Objectives">
          <TabData />
        </Tab>
        <Tab eventKey="curriculum" title="Curriculum">
          <TabData />
        </Tab>
        <Tab eventKey="instructor" title="Instructor">
          <TabData />
        </Tab>
        <Tab eventKey="feedback" title="Student Feedback">
          <TabData />
        </Tab>
      </Tabs>
    </React.Fragment>
  );
};

export default ProgramTabs;
