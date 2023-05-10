import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Card_Component from "./cardComp";
import MyCourses_Filter from "./filterDropdown";
import Course_Pagination from "./pagination";

const MyCourses = () => {
  const [key, setKey] = useState<any>("mycourses");
  return (
    <>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(e) => setKey(e)}
        className="mb-3"
      >
        <Tab eventKey="mycourses" title="My Courses">
          <MyCourses_Filter />
          <Card_Component />
          <Course_Pagination />
        </Tab>
      </Tabs>
    </>
  );
};

export default MyCourses;
