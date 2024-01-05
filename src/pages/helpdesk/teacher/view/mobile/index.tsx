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
import MobileHeader from "../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../newFooter/mobileFooter";

type Props = {
  commonProps: {
    onHide: any;
    apiStatus: any;
    modalTitle: any;
    totalPages: any;
    enquiryData: any;
    filterUpdate: any;
    onRepliesHide: any;
    modalShow: boolean;
    repliesAction: any;
    selectedTopic: any;
    getAllComment: any;
    refreshToggle: any;
    newPageRequest: any;
    modalTitleDate: any;
    selectedTopicId: any;
    toggleModalShow: any;
    repliesModalShow: any;
    setGetAllComment: any;
    updateTopicFilter: any;
    getSelectedTopicId: any;
    updateInputFilters: any;
    toggleRepliesModalShow: any;
  };
};

const Mobile = (props: Props) => {
  return (
    <React.Fragment>
      <MobileHeader />
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
              selectedTopic={props.commonProps.selectedTopic}
              toggleModalShow={props.commonProps.toggleModalShow}
              updateTopicFilter={props.commonProps.updateTopicFilter}
              updateInputFilters={props.commonProps.updateInputFilters}
            />

            <TeacherHelpdeskTable
              apiStatus={props.commonProps.apiStatus}
              enquiryData={props.commonProps.enquiryData}
              getSelectedTopicId={props.commonProps.getSelectedTopicId}
              toggleRepliesModalShow={props.commonProps.toggleRepliesModalShow}
            />
            <BuildPagination
              totalpages={props.commonProps.totalPages}
              getrequestedpage={props.commonProps.newPageRequest}
              activepage={props.commonProps.filterUpdate.pageNumber}
            />
          </Container>
        </div>
      </div>
      <NewRequestForm
        onHide={props.commonProps.onHide}
        modalShow={props.commonProps.modalShow}
        updateAddRefresh={props.commonProps.refreshToggle}
        selectedTopic={props.commonProps.selectedTopic}
        toggleModalShow={props.commonProps.toggleModalShow}
      />
      <RepliesForm
        onHide={props.commonProps.onRepliesHide}
        updateAddRefresh={props.commonProps.refreshToggle}
        modalShow={props.commonProps.repliesModalShow}
        repliesAction={props.commonProps.repliesAction}
        getAllComment={props.commonProps.getAllComment}
        selectedTopicId={props.commonProps.selectedTopicId}
        toggleRepliesModalShow={props.commonProps.toggleRepliesModalShow}
        modalTitle={props.commonProps.modalTitle}
        modalTitleDate={props.commonProps.modalTitleDate}
      />
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
