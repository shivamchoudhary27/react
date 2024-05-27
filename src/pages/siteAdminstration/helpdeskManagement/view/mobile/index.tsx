import React from "react";
import Filters from "../../filter";
import RepliesForm from "../../replyForm";
import { Container } from "react-bootstrap";
import HelpdeskManagementTable from "../../table";
import PageTitle from "../../../../../widgets/pageTitle";
import BuildPagination from "../../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";
import MobileHeader from "../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../newFooter/mobileFooter";
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
    repliesModalShow: any;
    filterUpdateTable: any;
    updateTopicFilter: any;
    getSelectedTopicId: any;
    editHandlerByQueryId: any;
    toggleQueryModalShow: any;
    toggleRepliesModalShow: any;
    helpdeskManagementData: any[];
    getAllProgram: any;
    setGetAllComment:any;
    setShowAlert:any;
    alertMsg:any;
    setAlertMsg:any;
    showAlert: any;
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
              apiStatus={props.commonProps.apiStatus}
              selectedTopic={props.commonProps.selectedTopic}
              updateTopicFilter={props.commonProps.updateTopicFilter}
              getAllProgram={props.commonProps.getAllProgram}
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
        showAlert={props.commonProps.showAlert}
        setShowAlert={props.commonProps.setShowAlert}
        alertMsg={props.commonProps.alertMsg}
        setAlertMsg={props.commonProps.setAlertMsg}
        setGetAllComment={props.commonProps.setGetAllComment}
      />
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
