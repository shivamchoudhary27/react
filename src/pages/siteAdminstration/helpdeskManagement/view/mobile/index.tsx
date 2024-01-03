import React from "react";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import { useNavigate } from "react-router-dom";
import HeaderTabs from "../../../../headerTabs";
import HelpdeskManagementTable from "../../table";
import { Container } from "react-bootstrap";
import PageTitle from "../../../../../widgets/pageTitle";
import BuildPagination from "../../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";
import Filters from "../../filter";

type Props = {
  commonProps: {
    apiStatus: any;
    totalPages: any;
    newPageRequest: any;
    filterUpdate: any;
    selectedTopic: any;
    updateTopicFilter: any;
    // toggleRepliesModalShow: any;
    helpdeskManagementData: any[];
    updateInputFilters:any;
  };
};

const Mobile = (props: Props) => {
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
            <PageTitle pageTitle="Helpdesk Management" gobacklink="/helpdesk" />
            {/* <Button variant="primary" onClick={() => navigate("/managetopic")}>
              Manage Topic
            </Button> */}
            <Filters 
            selectedTopic={props.commonProps.selectedTopic}
            updateTopicFilter={props.commonProps.updateTopicFilter}
            updateInputFilters={props.commonProps.updateInputFilters}
            />
            <HelpdeskManagementTable
              apiStatus={props.commonProps.apiStatus}
              // toggleRepliesModalShow= {props.commonProps.toggleRepliesModalShow}
              helpdeskManagementData={props.commonProps.helpdeskManagementData}
            />
            <BuildPagination
              totalpages={props.commonProps.totalPages}
              activepage={props.commonProps.filterUpdate}
              getrequestedpage={props.commonProps.newPageRequest}
            />
          </Container>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Mobile;
