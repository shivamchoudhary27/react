import React from "react";
import "./style.scss";
import { Container } from "react-bootstrap";
import Header from "../../header";
import Sidebar from '../../sidebar';
import Filter from "./filter";
import DepartmentTable from "./departmentTable";
import DepartmentPagination from "./pagination";

const Departments = () => {
  return (
    <>
      <Header pageHeading="" welcomeIcon={false} />
      <Sidebar />
      <Container fluid>
        <div className="contents" style={{paddingLeft: '270px', marginTop: '70px'}}>
          <div className="container-wrapper">
            <div className="site-heading">
              <h3>Departments</h3>
            </div>
          </div>
          <hr />
          <Filter />
          <DepartmentTable />
          <DepartmentPagination />
        </div>
      </Container>
    </>
  );
};

export default Departments;
