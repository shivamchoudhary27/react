import React, { useState } from "react";
import "./style.scss";
import { Container, Button } from "react-bootstrap";
import Header from "../../header";
import Sidebar from "../../sidebar";
import DiciplineTable from "./diciplineTable";
import DiciplineModal from "./diciplineModal";
import { useNavigate } from "react-router-dom";

const Discipline = () => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Header pageHeading="" welcomeIcon={false} />
      <Sidebar /> 
      <Container fluid>
        <div className="contents" style={{paddingLeft: '270px', marginTop: '70px'}}>
          <div className="container-wrapper">
            <div className="site-heading">
              <h3>Discipline</h3>
            </div>
          </div>
          <hr />
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Add Discipline
          </Button>
          {" "}
          <Button variant="outline-secondary" onClick={() => navigate("/manageprogram")}>Go back</Button>
        </div>
        <DiciplineTable />
        <DiciplineModal show={modalShow} onHide={() => setModalShow(false)} />
      </Container>
    </>
  );
};

export default Discipline;
