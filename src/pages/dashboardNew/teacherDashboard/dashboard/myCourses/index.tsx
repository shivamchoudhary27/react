import React, { useState } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import Card_Component from "./cardComp";
import FilterProgramDropdown from "./filterDropdown";
// import Course_Pagination from "./pagination";

type Props = {
  userCoursesData: any;
  enrolCoreCoursesObj: any
};

const MyCourses = (props: Props) => {

  const getCourseStatus = (val: string) => {
    const currentDate = new Date();
    const unixTimestampInSeconds = Math.floor(currentDate.getTime() / 1000);
    props.enrolCoreCoursesObj.map((item: any) => {
      console.log(item);
    });

    if (val === "progress") {
      console.log("progress");
    } else if (val === "notStarted") {
      console.log("notStarted");
    } else {
      console.log("completed");
    }
  };

  return (
    <>
      <Container fluid>
        <div className="d-flex align-items-center justify-content-between flex-wrap mitcomponet-heading">
          <h3>My Courses Teacher</h3>
          <FilterProgramDropdown coursesList={props.userCoursesData} getCourseStatus={getCourseStatus} />
        </div>
        <Card_Component courseList={props.userCoursesData} />
      </Container>
    </>
  );
};

export default MyCourses;
