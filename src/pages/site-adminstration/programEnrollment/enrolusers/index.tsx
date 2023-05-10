import React, { useState } from "react";
import Header from "../../../newHeader";
import Footer from "../../../newFooter";
import HeaderTabs from "../../../headerTabs";
// import Sidebar from "../../../sidebar";
import { Container, Button } from "react-bootstrap";
import UserTable from "./userTable";
import EnrolCourseFilter from "./filter";
import EnrolUserModal from "./enrolUserModal";
import BreadcrumbComponent from "../../../../widgets/breadcrumb";

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
      <Header />
      <HeaderTabs />
      <div className="contentarea-wrapper mt-3">
          <Container fluid className="administration-box">
          {/* <BreadcrumbComponent
            routes={[
              { name: "Site Administration", path: "/siteadmin" },
              { name: "User Management", path: "/programenrollment" },
              { name: "Manage program Enrollment", path: "" },
            ]}
          /> */}
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
      <Footer />
    </React.Fragment>
  );
};

export default EnrolUsersCourse;
