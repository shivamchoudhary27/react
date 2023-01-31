import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from '../../header';
import Sidebar from '../../sidebar';
import ManageFilter from "./manageFilter";
import ManageTable from "./manageTable";

const ManageProgram = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header pageHeading="" welcomeIcon={false} />
      <Sidebar /> 
      <Container fluid>
        <div className="contents" style={{paddingLeft: '270px', marginTop: '70px'}}>
          <div className="container-wrapper">
            <div className="site-heading">
              <h3>Manage Programs</h3>
            </div>
            <div className="site-button-group">
              <Button variant="primary" onClick={()=>navigate('/department')}>Department</Button>{' '}
              <Button variant="primary" onClick={()=>navigate('/programtype')}>Program Type</Button>{' '}
              <Button variant="primary" onClick={()=>navigate('/discipline')}>Disciplines</Button>
            </div>
          </div>
          <hr />
          <ManageFilter />
          <ManageTable />
        </div>
      </Container>
    </>
  );
};

export default ManageProgram;
