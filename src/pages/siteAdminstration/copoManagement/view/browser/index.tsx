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
import { useParams } from "react-router-dom";

type Props = {};

const Browser = (props: Props) => {
  const { id, name, cid, cname } = useParams()

  return (
    <React.Fragment>
      <Header />
      <HeaderTabs />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "CO/PO Management", path: "/copoManagement" },
          { name: name, path: `/copoCourse/${id}/${name}`},
          { name: cname, path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle={`${cname}: Configure Co/Po Course`} gobacklink={`/copoCourse/${id}/${name}`} />
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
