import React, { useEffect } from "react";
import Header from "../../header";
import Sidebar from "../../sidebar";
import { Container, Button } from "react-bootstrap";
import AddProgramForm from "./form";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.scss";

const AddProgram = () => {
  // const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // const urlParams = new URL(location.search);
    // const programId = urlParams.get('id');
    // console.log(programId + ' - id');
  }, []);

  return (
    <>
      <Header pageHeading="" welcomeIcon={false} />
      <div className='main-content-container'>
      <Sidebar />
      <div className="content-area content-area-slider" id="contentareaslider">
      <Container fluid className="administration-wrapper">
          <div className="contents">
            <Program_Form_Header navigate={navigate} />{" "}
            <hr />
            <div className="form-container-wrapper">
              <AddProgramForm />
            </div>
          </div>
        </Container>
      </div>
      </div>
    </>
  );
};

export default AddProgram;

const Program_Form_Header = ({ navigate }: any) => {
  return (
    <>
      <div className="site-heading">
        <h3>Add Program</h3>
      </div>
      <Button
        variant="outline-secondary"
        onClick={() => navigate("/manageprogram")}
      >
        Go back
      </Button>
    </>
  );
};
