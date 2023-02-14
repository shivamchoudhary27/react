import React, {useState} from "react";
import { Container, Button } from "react-bootstrap";
import Header from "../../header";
import Sidebar from "../../sidebar";
import ProgramTable from "./programTable";
import AddProgramModal from "./modal";
import { useNavigate } from "react-router-dom";

const ProgramType = () => {
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
              <h3>Program Type</h3>
            </div>
          </div>
          <hr />
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Add Program Type
          </Button>
          {" "}
          <Button variant="outline-secondary" onClick={() => navigate("/manageprogram")}>Go back</Button>
          <AddProgramModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <ProgramTable />
        </div>
      </Container>
    </>
  );
};

export default ProgramType;
