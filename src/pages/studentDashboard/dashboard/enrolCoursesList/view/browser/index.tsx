import React from "react";
import FilterProgramDropdown from "../../filterDropdown";
import { Container, Row, Col, Card } from "react-bootstrap";
import Errordiv from "../../../../../../widgets/alert/errordiv";
import gradeIcon from "../../../../../../assets/images/icons/grade.svg";
import badgesIcon from "../../../../../../assets/images/icons/badges.svg";
import courseImage from "../../../../../../assets/images/course-default.jpg";

type Props = {
  userCoursesData: any;
};

const Browser = ({ ...props }: Props) => {
  return (
    <React.Fragment>
      <Container fluid>
        <div className="d-flex align-items-center justify-content-between flex-wrap mitcomponet-heading">
          <h3>My Courses</h3>
          <FilterProgramDropdown />
        </div>
        <Row className="g-4 mylearning-card">
          {props.userCoursesData.courses.map((item: any, index: number) => (
            <Col sm={6} lg={4} xl={3} key={index}>
              <Card body className="h-100">
                <div className="mlcard-image">
                  <Card.Img src={courseImage} alt={item.shortname} />
                </div>
                <div className="mlcard-title">
                  <h5>{item.name}</h5>
                  <span className="my-progress">
                    {item.progress !== null ? `${item.progress}%` : 0 + "%"}
                  </span>
                </div>
                <div className="mlcard-info">
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
      {/* {coursesList.length === 0 && (
        <Errordiv msg="No course available!" cstate className="mt-3" />
      )} */}
    </React.Fragment>
  );
};

export default Browser;
