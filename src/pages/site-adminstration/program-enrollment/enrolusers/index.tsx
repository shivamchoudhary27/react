import React, { useState } from "react";
import Header from "../../../header";
import Sidebar from "../../../sidebar";
import { Container, Button } from "react-bootstrap";
import UserTable from "./userTable";
import EnrolCourseFilter from "./filter";
import EnrolUserModal from "./enrolUserModal";

const EnrolUsersCourse = () => {
  const [modalShow, setModalShow] = useState(false);

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  const enrolUserHandler = () => {
    toggleModalShow(true)
  }

  return (
    <React.Fragment>
      <Header
        pageHeading="Enrol users to course: Business Statistics"
        welcomeIcon={false}
      />
      <div className="main-content-container">
        <Sidebar />
        <div
          className="content-area content-area-slider"
          id="contentareaslider"
        >
          <Container fluid className="administration-wrapper">
            <EnrolCourseFilter togglemodalshow={toggleModalShow} />
            <hr />
            <UserTable />
            <div className="text-end">
              <Button variant="primary" onClick={enrolUserHandler}>Enroll</Button>
            </div>
            <EnrolUserModal
              show={modalShow}
              onHide={() => toggleModalShow(false)}
              togglemodalshow={toggleModalShow}
            />
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EnrolUsersCourse;
