import React, { useState } from "react";
import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";
import Card_Component from "./cardComp";
import FilterProgramDropdown from "./filterDropdown";

const ProgramCertification = () => {
  const [key, setKey] = useState<any>("program");
  return (
    <Container fluid>
      <div className="d-flex align-items-center justify-content-between mitcomponet-heading">
        <h3>My Courses</h3>
        <FilterProgramDropdown />
      </div>
      <Card_Component />
    </Container>
  );
};

export default ProgramCertification;
