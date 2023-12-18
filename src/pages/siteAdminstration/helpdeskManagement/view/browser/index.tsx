import React from "react";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import { useNavigate } from "react-router-dom";
import HeaderTabs from "../../../../headerTabs";
import HelpdeskManagementTable from "../../table";
import { Container, Button } from "react-bootstrap";
import PageTitle from "../../../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";

type Props = {};

const Browser = (props: Props) => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="attendance" />
      <BreadcrumbComponent
        routes={[
          { name: "Dashboard", path: "/dashboard" },
          { name: "Helpdesk Management", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle
              pageTitle="Helpdesk Management"
              gobacklink="/dashboard"
            />
            <Button variant="primary" onClick={() => navigate("/managetopic")}>
              Manage Topic
            </Button>
            <HelpdeskManagementTable />
            {/* <BuildPagination
              totalpages={props.commonProps.timeslotListPage}
              activepage={props.commonProps.filterUpdate}
              getrequestedpage={props.commonProps.newPageRequest}
            /> */}
          </Container>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Browser;
