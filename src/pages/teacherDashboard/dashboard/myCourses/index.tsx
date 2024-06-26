import React, { useState } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import Card_Component from "./cardComp";
import FilterProgramDropdown from "./filterDropdown";
// import Course_Pagination from "./pagination";

type Props = {
  userCoursesData: any
};

const MyCourses: React.FunctionComponent<Props> = ({ ...props }: Props) => {
  console.log(props.userCoursesData.courses)
  const [key, setKey] = useState<any>("mycourses");
  
  return (
    <>
      <Container fluid>
        <div className="d-flex align-items-center justify-content-between flex-wrap mitcomponet-heading">
          <h3>My Courses</h3>
          <FilterProgramDropdown />
        </div>
        <Card_Component userCoursesData={props.userCoursesData.courses} />
      </Container>
    </>
  );
};

export default MyCourses;
