import React, { useState } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import Card_Component from "./cardComp";
import FilterProgramDropdown from "./filterDropdown";
// import Course_Pagination from "./pagination";

const MyCourses = () => {
  const [key, setKey] = useState<any>("mycourses");
  return (
    <>
      <Container fluid>
      <div className="d-flex align-items-center justify-content-between flex-wrap mitcomponet-heading">
        <h3>My Courses</h3>
        <FilterProgramDropdown />
      </div>
      <Card_Component />
    </Container>
    </>
  );
};

export default MyCourses;
