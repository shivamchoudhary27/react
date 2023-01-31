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
      <Sidebar />
      <div className="container-wrapper" style={{paddingLeft: '270px', marginTop: '70px'}}>
        <Container fluid>
          <div className="site-heading">
            <h3>Program Enrollment</h3>
          </div>
          <hr />
          <ProgramEnrollFilter />
          <ProgramEnrollTable />
        </Container>
      </div>
    </>
  );
};

export default ProgramEnrollment;
