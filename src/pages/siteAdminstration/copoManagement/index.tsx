import React from "react";
import TabsList from "./tabs";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
import { Container } from "react-bootstrap";
import PageTitle from "../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../widgets/breadcrumb";

type Props = {};

const CoPoManagement = (props: Props) => {
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "CO/PO Management", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle="CO/PO Management" gobacklink="/siteadmin" />
          <TabsList />
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default CoPoManagement;
