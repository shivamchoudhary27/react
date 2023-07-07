import React from "react";
import { Table, Container, Row, Col } from "react-bootstrap";
import QuizIcon from '../../../assets/images/activityIcons/quiz.svg';
import AssignmentIcon from '../../../assets/images/activityIcons/assignment.svg';
import WorkshopIcon from '../../../assets/images/activityIcons/workshop.svg';
import AttendanceIcon from '../../../assets/images/activityIcons/attendance.svg';
import ForumIcon from '../../../assets/images/activityIcons/forum.svg';
import PageIcon from '../../../assets/images/activityIcons/page.svg';
import BookIcon from '../../../assets/images/activityIcons/book.svg';
import UserIcon from '../../../assets/images/activityIcons/user.svg';
import CategoryIcon from '../../../assets/images/activityIcons/category.svg';
import SiteIcon from '../../../assets/images/activityIcons/site.svg';
import CourseIcon from '../../../assets/images/activityIcons/course.svg';

const ModuleTable = ({ Field }: any) => {

  return (
    <>
      <Container fluid>
        <Row>
          {event_type.map((el, index) => (
            <CALENDER_MODULES el={el} key={index} Field={Field} />
          ))}
          {module_data.map((el, index) => (
            <CALENDER_MODULES el={el} key={index} Field={Field} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default ModuleTable;

const CALENDER_MODULES = ({ el, Field }: any) => (
    <Col md="2">
      <div className="d-flex flex-column align-items-center justify-content-center mb-4 events-color-items">
        <img src={el.image} alt={el.label} />
        <h5>{el.label}</h5>
        <Field id={el.label} type="color" name={el.label} />
        <Field type="text" name={el.label} />
      </div>
    </Col>
);

const event_type = [  
  {
    label: "site",
    icon: "fa-solid fa-file",
    image: SiteIcon
  },
  {
    label: "category",
    icon: "fa-solid fa-sitemap",
    image: CategoryIcon
  },
  {
    label: "course",
    icon: "fa-solid fa-graduation-cap",
    image: CourseIcon
  },
  {
    label: "user",
    icon: "fa-solid fa-user",
    image: UserIcon
  },  
];

const module_data = [  
  {
    label: "quiz",
    icon: "fa-solid fa-file",
    image: QuizIcon
  },
  {
    label: "assignment",
    icon: "fa-solid fa-file",
    image: AssignmentIcon
  },
  {
    label: "workshop",
    icon: "fa-solid fa-briefcase",
    image: WorkshopIcon
  },
  {
    label: "attendance",
    icon: "fa-solid fa-file",
    image: AttendanceIcon
  },  
  {
    label: "forum",
    icon: "fa-solid fa-file",
    image: ForumIcon
  },
  {
    label: "page",
    icon: "fa-solid fa-file",
    image: PageIcon
  },
  {
    label: "book",
    icon: "fa-solid fa-book",
    image: BookIcon
  },
];
