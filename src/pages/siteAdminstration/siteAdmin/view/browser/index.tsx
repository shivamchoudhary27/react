import React from "react";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import { Container } from "react-bootstrap";
import HeaderTabs from "../../../../headerTabs";
import PageTitle from "../../../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";
import bgRight from "../../../../../assets/images/background/bg-admin-right.svg";
import bgLeft from "../../../../../assets/images/background/bg-admin-left.svg";

type Props = {
  commonProps: {
    adminRawData: any[];
    renderComponent: any;
  };
};

const Browser = (props: Props) => {
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Dashboard", path: "/dashboard" },
          { name: "Site Administration", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-4 mb-5">
        <img src={bgLeft} className="bg-left" alt="bg-left" />
        <img src={bgRight} className="bg-right" alt="bg-right" />
        <Container fluid>
          <PageTitle pageTitle="Site Administration" gobacklink="/dashboard" />
        </Container>
        {props.commonProps.adminRawData.map((item: any, index: number) => (
          <Container
            key={index}
            className={`administration-box row${index + 1}`}
          >
            {item.map((item: any, index: number) =>
              props.commonProps.renderComponent(item, index)
            )}
          </Container>
        ))}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Browser;
