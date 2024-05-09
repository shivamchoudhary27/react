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
  const { id, name, cid, cname } = useParams()

  return (
    <React.Fragment>
    <MobileHeader />
    <BreadcrumbComponent
      routes={[
        { name: "Site Administration", path: "/siteadmin" },
          { name: "CO/PO Management", path: "/copoManagement" },
          { name: name, path: `/copoCourse/${id}/${name}` },
          { name: cname, path: "" },
      ]}
    />
    <div className="contentarea-wrapper mt-3 mb-5">
      <Container fluid>
        <PageTitle pageTitle={`${cname}: Configure Co/Po Course`} gobacklink={`/copoCourse/${id}/${name}`} />
          {/* <ProgramEnrollment/>         */}
          <TabsList />
        </Container>
      </div>
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
