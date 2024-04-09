import React from "react";
import Filters from "../../filter";
import StatusModalForm from "../../form";
import RepliesForm from "../../replyForm";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import { Container } from "react-bootstrap";
import HeaderTabs from "../../../../headerTabs";
import HelpdeskManagementTable from "../../table";
import PageTitle from "../../../../../widgets/pageTitle";
import BuildPagination from "../../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";
import BottomLeftWave from "../../../../../assets/images/background/bg-bottomleft.svg";
import QueryModalForm from "../../queryModalForm";

type Props = {
  commonProps: {
    onHide: any;
    queryObj: any;
    topicObj: any;
    apiStatus: any;
    modalShow: any;
    totalPages: any;
    modalTitle: any;
    onQueryHide: any;
    filterUpdate: any;
    getAllComment: any;
    refreshToggle: any;
    selectedTopic: any;
    onRepliesHide: any;
    repliesAction: any;
    queryModalShow: any;
    newPageRequest: any;
    modalTitleDate: any;
    setFilterUpdate: any;
    editHandlerById: any;
    toggleModalShow: any;
    selectedTopicId: any;
    filterUpdateTable: any;
    repliesModalShow: any;
    getAllProgram: any;
    updateTopicFilter: any;
    getSelectedTopicId: any;
    editHandlerByQueryId: any;
    toggleQueryModalShow: any;
    toggleRepliesModalShow: any;
    helpdeskManagementData: any[];
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
          { name: "Helpdesk Management", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle pageTitle="Helpdesk Management" gobacklink="/helpdesk" />
            <Filters
              apiStatus={props.commonProps.apiStatus}
              selectedTopic={props.commonProps.selectedTopic}
              getAllProgram={props.commonProps.getAllProgram}
              updateTopicFilter={props.commonProps.updateTopicFilter}
            />
            <HelpdeskManagementTable
              apiStatus={props.commonProps.apiStatus}
              filterUpdate={props.commonProps.filterUpdate}
              setFilterUpdate={props.commonProps.setFilterUpdate}
              toggleModalShow={props.commonProps.toggleModalShow}
              editHandlerById={props.commonProps.editHandlerById}
              queryDeleteRefresh={props.commonProps.refreshToggle}
              filterUpdateTable={props.commonProps.filterUpdateTable}
              getSelectedTopicId={props.commonProps.getSelectedTopicId}
              editHandlerByQueryId={props.commonProps.editHandlerByQueryId}
              toggleQueryModalShow={props.commonProps.toggleQueryModalShow}
              toggleRepliesModalShow={props.commonProps.toggleRepliesModalShow}
              helpdeskManagementData={props.commonProps.helpdeskManagementData}
            />
            <BuildPagination
              totalpages={props.commonProps.totalPages}
              activepage={props.commonProps.filterUpdate.pageNumber}
              getrequestedpage={props.commonProps.newPageRequest}
            />
          </Container>
        </div>
      </div>
      <QueryModalForm
        queryObj={props.commonProps.queryObj}
        onHide={props.commonProps.onQueryHide}
        modalShow={props.commonProps.queryModalShow}
        queryDeleteRefresh={props.commonProps.refreshToggle}
        toggleQueryModalShow={props.commonProps.toggleQueryModalShow}
      />
      <StatusModalForm
        onHide={props.commonProps.onHide}
        topicObj={props.commonProps.topicObj}
        modalShow={props.commonProps.modalShow}
        selectedTopic={props.commonProps.selectedTopic}
        updateAddRefresh={props.commonProps.refreshToggle}
        toggleModalShow={props.commonProps.toggleModalShow}
        updateTopicFilter={props.commonProps.updateTopicFilter}
      />
      <RepliesForm
        apiStatus={props.commonProps.apiStatus}
        onHide={props.commonProps.onRepliesHide}
        modalTitle={props.commonProps.modalTitle}
        modalShow={props.commonProps.repliesModalShow}
        repliesAction={props.commonProps.repliesAction}
        getAllComment={props.commonProps.getAllComment}
        modalTitleDate={props.commonProps.modalTitleDate}
        updateAddRefresh={props.commonProps.refreshToggle}
        selectedTopicId={props.commonProps.selectedTopicId}
        toggleRepliesModalShow={props.commonProps.toggleRepliesModalShow}
      />
      <Footer />
      <div className="bottomLeftWave">
        <img src={BottomLeftWave} alt="bottom wave" />
      </div>
    </React.Fragment>
  );
};

export default Browser;
