import React from "react";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
// import Sidebar from "../../sidebar";
import { Container, Button } from "react-bootstrap";
import CoursesTable from "./coursesTable";
import { useNavigate } from "react-router-dom";
import BreadcrumbComponent from "../../../widgets/breadcrumb";

const ManageCourses = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <HeaderTabs />
      <BreadcrumbComponent
            routes={[
              { name: "Site Administration", path: "/siteadmin" },
              { name: "User Management", path: "/manageprogram" },
              { name: "Manage Courses", path: "" },
            ]}
          />
      <div className="contentarea-wrapper mt-5">
          <Container fluid>          
              <Button
            variant="outline-secondary"
            onClick={() => navigate("/manageprogram")}
          >
            Go back
          </Button>
              <hr />
              <CoursesTable />
          </Container>
        </div>
      <Footer />
    </>
  );
};

export default ManageCourses;
