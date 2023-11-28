import React from "react";
import ModuleList from "../../moduleList";
import { Container } from "react-bootstrap";
import PageTitle from "../../../../../widgets/pageTitle";
import MobileHeader from "../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../newFooter/mobileFooter";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";

type Props = {};

const Mobile = (props: Props) => {
  return (
    <React.Fragment>
      <MobileHeader />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Timetable", path: "/timetable" },
          { name: "Events color", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle pageTitle="Events Color" gobacklink="/timetable" />
            {<ModuleList />}
          </Container>
        </div>
      </div>
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
