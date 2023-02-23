import React from 'react';
import Header from '../../header'
import Sidebar from '../../sidebar'
import { Container, Button } from 'react-bootstrap'
import AddProgramForm from './form'
import { useNavigate } from "react-router-dom";

const AddProgram = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header pageHeading="" welcomeIcon={false} />
      <Sidebar />
      <Container fluid>
        <div
          className="contents"
          style={{ paddingLeft: "270px", marginTop: "70px" }}
        >
          <div className="container-wrapper">
            <div className="site-heading">
              <h3>Add Program</h3>
            </div>
            <Button variant="outline-secondary" onClick={() => navigate("/manageprogram")}>Go back</Button>
          </div>
          {" "}
          <hr />
          <AddProgramForm />
        </div>
      </Container>
    </>
  );
};

export default AddProgram;
