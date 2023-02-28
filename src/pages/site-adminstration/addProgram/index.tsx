import React from "react";
import Header from "../../header";
import Sidebar from "../../sidebar";
import { Container, Button } from "react-bootstrap";
import AddProgramForm from "./form";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const style = {
  paddingLeft: "270px",
  marginTop: "70px",
};

const AddProgram = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header pageHeading="" welcomeIcon={false} />
      <Sidebar />
      <Container>
        <div className="contents" style={style}>
          <div className="container-wrapper">
            <Program_Form_Header navigate={navigate} />{" "}
          </div>
          <hr />
          <div className="form-container-wrapper">
            <AddProgramForm />
          </div>
        </div>
      </Container>
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
