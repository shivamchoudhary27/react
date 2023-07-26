import React from "react";
import Header from "../../newHeader";
import HeaderTabs from "../../headerTabs";
import Footer from "../../newFooter";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import PageTitle from "../../../widgets/pageTitle";
import { Container } from "react-bootstrap";
import TabsList from "./tabs";

type Props = {};

const CoPoManagement = (props: Props) => {
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs />
      <BreadcrumbComponent routes={[{ name: "Co/Po Management", path: "" }]} />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle="Co/Po Management" gobacklink="" />
          <TabsList />
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default CoPoManagement;
