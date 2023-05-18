import React from "react";
import { Button, Container } from "react-bootstrap";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
// import Sidebar from "../../sidebar";
import Module_List from "./moduleList";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import "./style.scss";

const CalenderConfig = () => {
  const navigate = useNavigate();

  const SITE_HEADING = (
    <div className="site-heading">
      <div>
        <Button
          type="button"
          variant="primary"
          onClick={() => navigate("/calender")}
        >
          View Calender
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <HeaderTabs activeTab="calender"/>
      <BreadcrumbComponent routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Calender Management", path: "" }
        ]} />
      <div className="contentarea-wrapper mt-3">
          <Container fluid>
          <PageTitle pageTitle="Calendar Management" gobacklink="/siteadmin" />
            <div className="container-wrapper"></div>
            {SITE_HEADING}
            <div className="form-container-wrapper">{<Module_List />}</div>
          </Container>
        </div>
      <Footer />
    </>
  );
};

export default CalenderConfig;
