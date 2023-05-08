import React from "react";
import { Button, Container } from "react-bootstrap";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
// import Sidebar from "../../sidebar";
import Module_List from "./module_list";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const CalenderConfig = () => {
  const navigate = useNavigate();

  const SITE_HEADING = (
    <div className="site-heading">
      <div>
        <h3>Calendar Management</h3>
      </div>
      <div>
        <Button
          type="button"
          variant="primary"
          onClick={() => navigate("/calender")}
        >
          View Calender
        </Button>{" "}
        <Button
          type="button"
          variant="outline-secondary"
          onClick={() => navigate("/siteadmin")}
        >
          Back
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <HeaderTabs />
      <div className="contentarea-wrapper mt-3">
          <Container fluid className="administration-box">
            <div className="container-wrapper"></div>
            {SITE_HEADING}
            <hr />
            <div className="form-container-wrapper">{<Module_List />}</div>
          </Container>
        </div>
      <Footer />
    </>
  );
};

export default CalenderConfig;
