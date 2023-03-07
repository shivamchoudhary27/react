import React from "react";
import "./style.scss";
import { Container } from "react-bootstrap";
import ProgramEnrollFilter from "./programEnrollFilter";
import ProgramEnrollTable from "./programEnrollTable";
import Header from "../../header";
import Sidebar from "../../sidebar";

const ProgramEnrollment = () => {
  return (
    <>
    <Header pageHeading="" welcomeIcon={false} />
    <div className='main-content-container'>
      <Sidebar />
      <div className="content-area content-area-slider" id="contentareaslider">
        <Container fluid className="administration-wrapper">
          <div className="site-heading">
            <h3>Program Enrollment</h3>
          </div>
          <hr />
          <ProgramEnrollFilter />
          <ProgramEnrollTable />
        </Container>
      </div>
    </div>
    </>
  );
};

export default ProgramEnrollment;
