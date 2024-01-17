import UserTable from "./userTable";
import React, { useState } from "react";
import Header from "../../../newHeader";
import Footer from "../../../newFooter";
// import Sidebar from "../../../sidebar";
import EnrolCourseFilter from "./filter";
import HeaderTabs from "../../../headerTabs";
import EnrolUserModal from "./enrolUserModal";
import { Container, Button } from "react-bootstrap";
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
      <HeaderTabs activeTab="siteadmin"/>
      {/* <BreadcrumbComponent
            routes={[
              { name: "Site Administration", path: "/siteadmin" },
              { name: "User Management", path: "/programenrollment" },
              { name: "Manage program Enrollment", path: "" },
            ]}
          /> */}
      <div className="contentarea-wrapper mt-4 mb-5">
          <Container fluid>          
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
