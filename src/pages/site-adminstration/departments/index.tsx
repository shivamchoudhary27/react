import React from "react";
import "./style.scss";
import { Container, Button } from "react-bootstrap";
import Header from "../../header";
import Sidebar from '../../sidebar';
import Filter from "./filter";
import DepartmentTable from "./departmentTable";
import DepartmentPagination from "./pagination";
import { useNavigate } from "react-router-dom";

const Departments = () => {
  const navigate = useNavigate();

  const handleProgramType = () => {
    navigate('/programtype')
  }

  const handleDiscipline = () => {
    navigate('/discipline');
  }

  const handleManageProgram = () => {
    navigate('/manageprogram')
  }

  return (
    <>
      <Header pageHeading="" welcomeIcon={false} />
      <Sidebar />
      <Container fluid>
        <div className="contents" style={{paddingLeft: '290px', paddingRight: '2%'}}>
          <div className="container-wrapper" >
            <div className="site-heading">
              <h3>Departments</h3>
            </div>
            <div className="site-button-group">
              <Button variant="primary" onClick={handleManageProgram}>Manage Programs</Button>{' '}
              <Button variant="primary" onClick={handleProgramType}>Program Type</Button>{' '}
              <Button variant="primary" onClick={handleDiscipline}>Disciplines</Button>
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
