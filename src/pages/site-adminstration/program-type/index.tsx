import React, {useState} from "react";
import { Container, Button } from "react-bootstrap";
import Header from "../../header";
import Sidebar from "../../sidebar";
import ProgramTable from "./programTable";
import AddProgramModal from "./modal";

const ProgramType = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Header pageHeading="" welcomeIcon={false} />
      <Sidebar />
      <Container fluid>
        <div className="contents" style={{paddingLeft: '290px', paddingRight: '2%'}}>
          <div className="container-wrapper">
            <div className="site-heading">
              <h3>Program Type</h3>
            </div>
          </div>
          <hr />
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Add Program Type
          </Button>
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
