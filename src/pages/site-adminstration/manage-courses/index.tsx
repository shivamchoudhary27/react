import React from "react";
import Header from "../../header";
import Sidebar from "../../sidebar";
import { Container, Button } from "react-bootstrap";
import CoursesTable from "./coursesTable";
import { useNavigate } from "react-router-dom";

const ManageCourses = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header pageHeading="Manage Courses: Master of Computer Applications" welcomeIcon={false} />
      <div className='main-content-container'>
        <Sidebar />
        <div className="content-area content-area-slider" id="contentareaslider">
          <Container fluid className="administration-wrapper">
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
      </div>
      
    </>
  );
};

export default ManageCourses;
