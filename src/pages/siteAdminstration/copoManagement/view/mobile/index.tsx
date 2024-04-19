import React from "react";
import { Container } from "react-bootstrap";
import './../../style.scss';
import "./../../mobileStyle.scss";
import MobileHeader from "../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../newFooter/mobileFooter";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";
import PageTitle from "../../../../../widgets/pageTitle";
import TabsList from "../../tabs";
type Props = {};

const Mobile = (props: Props) => {


  return (
    <React.Fragment>
    <MobileHeader />
    <BreadcrumbComponent
      routes={[
        { name: "Site Administration", path: "/siteadmin" },
        { name: "CO/PO Management", path: "/copoManagement" },
      ]}
    />
    <div className="contentarea-wrapper mt-3 mb-5">
      <Container fluid>
          <PageTitle pageTitle="CO/PO Management" gobacklink="/siteadmin" />
          {/* <ProgramEnrollment/>         */}
          <TabsList />
        </Container>
      </div>
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;