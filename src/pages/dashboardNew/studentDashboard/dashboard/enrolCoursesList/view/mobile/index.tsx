import React, { useState } from "react";
import FilterProgramDropdown from "../../filterDropdown";
import { Container, Row, Col, Card } from "react-bootstrap";
import Errordiv from "../../../../../../../widgets/alert/errordiv";
import gradeIcon from "../../../../../../../assets/images/icons/grade.svg";
import badgesIcon from "../../../../../../../assets/images/icons/badges.svg";
import courseImage from "../../../../../../../assets/images/course-default.jpg";
import filterIcon from "../../../../../../../assets/images/icons/mb-filterIcon.svg";

import "./mobileStyle.scss";

type Props = {
  coursesList: any;
  enrolCoreCoursesObj: any
};

const Mobile: React.FC<Props> = (props) => {
  const getCourseProgress = (id: number) => {
    const foundObject: any = props.enrolCoreCoursesObj.find(
      (item: any) => item.idNumber === id
    );
    if (foundObject) {
      return foundObject.progress !== null
        ? `${foundObject.progress}%`
        : 0 + "%";
    }
    return "0%";
  };

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
  const [showFilterDropdown, setShowFilterDropdown] = useState(true);
  const toggleFilterDropdown = () => {
    setShowFilterDropdown(!showFilterDropdown);
  };
  return (
    <React.Fragment>
      <Container fluid>
        <div className="d-flex align-items-center justify-content-between flex-wrap mitcomponet-heading">
          <h3>My Courses</h3>
          <button onClick={toggleFilterDropdown} className="filter-btn">
            <img src={filterIcon} alt="filter-icon" />
          </button>
          <div className={showFilterDropdown ? "FilterProgramDropdown-wrapper" : "FilterProgramDropdown-wrapper hidden"}>
          <FilterProgramDropdown getCourseStatus={getCourseStatus} coursesList={props.coursesList} />
          </div>
        </div>
        <Row className="g-4 mylearning-card">
          {props.coursesList.courses.map((item: any, index: number) => (
            <Col sm={6} lg={4} xl={3} key={index}>
              <Card body className="h-100">
                <div className="mlcard-image">
                  <Card.Img src={courseImage} alt={item.shortname} />
                </div>
                <div className="mlcard-title">
                  <h5>{item.name}</h5>
                  <span className="my-progress">
                    {getCourseProgress(item.idNumber)}
                  </span>
                </div>
                <div className="mlcard-info mb-cardinfo">
                  <div>
                    <img src={gradeIcon} alt="Grade" className="small-icon" />
                    Grade:
                    <span>30%</span>
                  </div>
                  <div>
                    <img src={badgesIcon} alt="Badges" />
                    Badges:
                    <span>1</span>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      {/* {coursesList.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )} */}
      {/* {props.coursesList.length === 0 && (
        <Errordiv msg="No course available!" cstate className="mt-3" />
      )} */}
    </React.Fragment>
  );
};

export default Mobile;
