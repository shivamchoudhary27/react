import React from "react";
import { Container } from "react-bootstrap";
import './../../style.scss';
import "./../../mobileStyle.scss";
import MobileHeader from "../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../newFooter/mobileFooter";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";
import PageTitle from "../../../../../widgets/pageTitle";
import TabsList from "../../tabs";
import { useParams } from "react-router-dom";

type Props = {};

const Mobile = (props: Props) => {
  const { name } = useParams()

  return (
    <React.Fragment>
    <MobileHeader />
    <BreadcrumbComponent
      routes={[
        { name: "Site Administration", path: "/siteadmin" },
          { name: "CO/PO Management", path: "/copoManagement" },
          { name: "Configure Co/Po", path: "/copoManagement" },
          { name: name, path: "/copomanagement" },
      ]}
    />
    <div className="contentarea-wrapper mt-3 mb-5">
      <Container fluid>
        <PageTitle pageTitle={`${name}: Configure Co/Po Course`} gobacklink="/copoManagement" />
          {/* <ProgramEnrollment/>         */}
          <TabsList />
        </Container>
      </div>
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
