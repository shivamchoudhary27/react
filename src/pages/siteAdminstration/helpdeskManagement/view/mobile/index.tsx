import React from "react";
import Filters from "../../filter";
import StatusModalForm from "../../form";
import RepliesForm from "../../replyForm";
import { Container } from "react-bootstrap";
import HelpdeskManagementTable from "../../table";
import PageTitle from "../../../../../widgets/pageTitle";
import BuildPagination from "../../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";
import MobileHeader from "../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../newFooter/mobileFooter";

type Props = {
  commonProps: {
    onHide: any;
    topicObj: any;
    apiStatus: any;
    modalShow: any;
    totalPages: any;
    modalTitle: any;
    filterUpdate: any;
    getAllComment: any;
    refreshToggle: any;
    selectedTopic: any;
    onRepliesHide: any;
    repliesAction: any;
    newPageRequest: any;
    modalTitleDate: any;
    editHandlerById: any;
    toggleModalShow: any;
    selectedTopicId: any;
    repliesModalShow: any;
    updateTopicFilter: any;
    getSelectedTopicId: any;
    toggleRepliesModalShow: any;
    helpdeskManagementData: any[];
    getAllProgram: any;
  };
};

const Mobile = (props: Props) => {
  return (
    <React.Fragment>
      <MobileHeader />
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
              getAllProgram={props.commonProps.getAllProgram}
            />
            <HelpdeskManagementTable
              apiStatus={props.commonProps.apiStatus}
              toggleModalShow={props.commonProps.toggleModalShow}
              editHandlerById={props.commonProps.editHandlerById}
              getSelectedTopicId={props.commonProps.getSelectedTopicId}
              toggleRepliesModalShow={props.commonProps.toggleRepliesModalShow}
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
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
