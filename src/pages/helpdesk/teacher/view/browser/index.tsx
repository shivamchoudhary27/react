import React from "react";
import Filter from "../../filter";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import RepliesForm from "../../repliesForm";
import { Container } from "react-bootstrap";
import TeacherHelpdeskTable from "../../table";
import HeaderTabs from "../../../../headerTabs";
import NewRequestForm from "../../newRequestForm";
import PageTitle from "../../../../../widgets/pageTitle";
import BuildPagination from "../../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";

type Props = {
  commonProps: {
    onHide: any;
    apiStatus: any;
    totalPages: any;
    modalShow: boolean;
    enquiryData: any;
    onRepliesHide: any;
    newPageRequest: any;
    filterUpdate: any;
    repliesAction: any;
    selectedTopic: any;
    uniqueEnquiryData: any;
    selectedTopicId: any;
    getAllComment: any;
    toggleModalShow: any;
    repliesModalShow: any;
    getSelectedTopicId: any;
    updateTopicFilter: any;
    updateInputFilters: any;
    setGetAllComment: any;
    toggleRepliesModalShow: any;
  };
};

const Browser = (props: Props) => {
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="helpdesk" />
      <BreadcrumbComponent
        routes={[
          { name: "Dashboard", path: "/dashboard" },
          { name: "Helpdesk", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle pageTitle="Help Desk" gobacklink="/dashboard" />
            <Filter
              enquiryData={props.commonProps.enquiryData}
              toggleModalShow={props.commonProps.toggleModalShow}
              selectedTopic={props.commonProps.selectedTopic}
              updateTopicFilter={props.commonProps.updateTopicFilter}
              updateInputFilters={props.commonProps.updateInputFilters}
              uniqueEnquiryData={props.commonProps.uniqueEnquiryData}
            />

            <TeacherHelpdeskTable
              enquiryData={props.commonProps.enquiryData}
              // uniqueEnquiryData={props.commonProps.uniqueEnquiryData}
              apiStatus={props.commonProps.apiStatus}
              toggleRepliesModalShow={props.commonProps.toggleRepliesModalShow}
              getSelectedTopicId={props.commonProps.getSelectedTopicId}
            />
            <BuildPagination
              totalpages={props.commonProps.totalPages}
              activepage={props.commonProps.filterUpdate.pageNumber}
              getrequestedpage={props.commonProps.newPageRequest}
            />
          </Container>
        </div>
      </div>
      <NewRequestForm
        onHide={props.commonProps.onHide}
        modalShow={props.commonProps.modalShow}
        toggleModalShow={props.commonProps.toggleModalShow}
        selectedTopic={props.commonProps.selectedTopic}
      />
      <RepliesForm
        onHide={props.commonProps.onRepliesHide}
        modalShow={props.commonProps.repliesModalShow}
        repliesAction={props.commonProps.repliesAction}
        selectedTopicId={props.commonProps.selectedTopicId}
        toggleRepliesModalShow={props.commonProps.toggleRepliesModalShow}
        getAllComment={props.commonProps.getAllComment}
      />
      <Footer />
    </React.Fragment>
  );
};

export default Browser;
