import React from "react";
import { Container } from "react-bootstrap";
import PageTitle from "../../../../../widgets/pageTitle";
import MobileHeader from "../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../newFooter/mobileFooter";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";

type Props = {
  commonProps: {
    adminRawData: any[];
    renderComponent: any;
  };
};

const Mobile = (props: Props) => {
  return (
    <React.Fragment>
      <MobileHeader />
      <BreadcrumbComponent
        routes={[
          { name: "Dashboard", path: "/dashboard" },
          { name: "Site Administration", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-4 mb-5">
          <Container fluid>
            <PageTitle
              pageTitle="Site Administration"
              gobacklink="/dashboard"
            />
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
      </div>
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
