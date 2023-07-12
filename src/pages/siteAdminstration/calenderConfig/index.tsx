import React from "react";
import { Container } from "react-bootstrap";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
import ModuleList from "./moduleList";
import PageTitle from "../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import "./style.scss";

const CalenderConfig = () => {
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="calender"/>
      <BreadcrumbComponent routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Timetable", path: "/timetable" },
          { name: "Events color", path: "" }
        ]} />      
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle="Events Color" gobacklink="/timetable" />
          {<ModuleList />}
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default CalenderConfig;
