import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../../header";
import Sidebar from "../../sidebar";
import ManageFilter from "./manageFilter";
import ManageTable from "./manageTable";

const ManageProgram = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header pageHeading="" welcomeIcon={false} />
      <div className='main-content-container'>
        <Sidebar />
        <div className="content-area content-area-slider" id="contentareaslider">
          <Container fluid className="administration-wrapper">        
            <div className="site-heading">
              <h3>Manage Programs</h3>
            </div>
            <div className="site-button-group">
              <Button
                variant="primary"
                onClick={() => navigate("/department")}
              >
                Department
              </Button>{" "}
              <Button
                variant="primary"
                onClick={() => navigate("/programtype")}
              >
                Program Type
              </Button>{" "}
              <Button variant="primary" onClick={() => navigate("/discipline")}>
                Disciplines
              </Button>
            </div>
            <hr />
            <ManageFilter />
            <ManageTable />
          </Container>
        </div>
      </div>
    </>
  );
};

export default ManageProgram;
