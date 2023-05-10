import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Card_Component from "./cardComp";
import FilterProgramDropdown from "./filterDropdown";
import Certification from "./certification";

const Program_Certification = () => {
  const [key, setKey] = useState<any>("program");
  return (
    <>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(e) => setKey(e)}
        className="mb-3"
      >
        <Tab eventKey="program" title="Program">
          <FilterProgramDropdown />
          <Card_Component />
        </Tab>
        <Tab eventKey="certification" title="Certification">
          <Certification />
        </Tab>
      </Tabs>
    </>
  );
};

export default Program_Certification;
