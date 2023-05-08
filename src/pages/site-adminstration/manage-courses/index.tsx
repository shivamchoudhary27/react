import React from "react";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
// import Sidebar from "../../sidebar";
import { Container, Button } from "react-bootstrap";
import CoursesTable from "./coursesTable";
import { useNavigate } from "react-router-dom";

const ManageCourses = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <HeaderTabs />
      <div className="contentarea-wrapper mt-3">
          <Container fluid className="administration-box">
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
