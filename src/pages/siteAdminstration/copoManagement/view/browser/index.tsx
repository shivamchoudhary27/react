import React from "react";
import TabsList from "./../../tabs";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import HeaderTabs from "../../../../headerTabs";
import { Container } from "react-bootstrap";
import PageTitle from "../../../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";
import './../../style.scss';
import "./../../mobileStyle.scss";
import { BackgroundWaveBottomLeft, BackgroundWaveRight } from "../../../../../widgets/backgroundElements";

type Props = {};

const Browser = (props: Props) => {


  return (
    <React.Fragment>
      <Header />
      <HeaderTabs />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "CO/PO Management", path: "/copoManagement" },
          { name: "Configure Co/Po", path: "/copoManagement" },
          { name: "Configure Co/Po Course", path: "/copomanagement" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle="Configure Co/Po Course" gobacklink="/siteadmin" />
          <TabsList />
        </Container>
      </div>
      <Footer />
      <BackgroundWaveBottomLeft/>
      <BackgroundWaveRight/>
    </React.Fragment>
  );
};

export default Browser;
