import React from "react";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import HeaderTabs from "../../../../headerTabs";
import HelpdeskManagementTable from "../../table";
import { Container } from "react-bootstrap";
import PageTitle from "../../../../../widgets/pageTitle";
import BuildPagination from "../../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";
import Filters from "../../filter";
import StatusModalForm from "../../form";

type Props = {
  commonProps: {
    apiStatus: any;
    totalPages: any;
    modalShow: any;
    toggleModalShow: any;
    onHide: any;
    filterUpdate: any;
    refreshToggle: any;
    selectedTopic: any;
    newPageRequest: any;
    updateTopicFilter: any;
    updateInputFilters: any;
    helpdeskManagementData: any[];
    topicObj: any,
    editHandlerById: any,
  };
};

const Browser = (props: Props) => {
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
            <Filters
              selectedTopic={props.commonProps.selectedTopic}
              updateTopicFilter={props.commonProps.updateTopicFilter}
              updateInputFilters={props.commonProps.updateInputFilters}
            />
            <HelpdeskManagementTable
              apiStatus={props.commonProps.apiStatus}
              toggleModalShow={props.commonProps.toggleModalShow}
              editHandlerById={props.commonProps.editHandlerById}
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

      <StatusModalForm
      updateTopicFilter={props.commonProps.updateTopicFilter}
        onHide={props.commonProps.onHide}
        modalShow={props.commonProps.modalShow}
        updateAddRefresh={props.commonProps.refreshToggle}
        topicObj={props.commonProps.topicObj}
        selectedTopic={props.commonProps.selectedTopic}
        toggleModalShow={props.commonProps.toggleModalShow}
      />
      <Footer />
    </React.Fragment>
  );
};

export default Browser;
