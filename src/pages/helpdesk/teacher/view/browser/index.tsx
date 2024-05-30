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
import BottomWave from "../../../../../assets/images/background/bg-bottom.svg";
import bgLeft from "../../../../../assets/images/background/bg-admin-left.svg";

type Props = {
  commonProps: {
    onHide: any;
    alertMsg:any;
    apiStatus: any;
    showAlert: any;
    totalPages: any;
    modalTitle: any;
    setAlertMsg:any;
    enquiryData: any;
    setShowAlert:any;
    filterUpdate: any;
    onRepliesHide: any;
    modalShow: boolean;
    repliesAction: any;
    selectedTopic: any;
    getAllComment: any;
    refreshToggle: any;
    modalTitleDate: any;
    newPageRequest: any;
    setGetAllComment:any;
    setFilterUpdate: any;
    selectedProgram: any;
    selectedTopicId: any;
    toggleModalShow: any;
    repliesModalShow: any;
    updateTopicFilter: any;
    getSelectedTopicId: any;
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
              apiStatus={props.commonProps.apiStatus}
              selectedTopic={props.commonProps.selectedTopic}
              toggleModalShow={props.commonProps.toggleModalShow}
              updateTopicFilter={props.commonProps.updateTopicFilter}
            />

            <TeacherHelpdeskTable
              apiStatus={props.commonProps.apiStatus}
              enquiryData={props.commonProps.enquiryData}
              filterUpdate={props.commonProps.filterUpdate}
              setFilterUpdate={props.commonProps.setFilterUpdate}
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
        selectedTopic={props.commonProps.selectedTopic}
        updateAddRefresh={props.commonProps.refreshToggle}
        selectedProgram={props.commonProps.selectedProgram}
        toggleModalShow={props.commonProps.toggleModalShow}
      />
      <RepliesForm
        alertMsg={props.commonProps.alertMsg}
        showAlert={props.commonProps.showAlert}
        apiStatus={props.commonProps.apiStatus}
        onHide={props.commonProps.onRepliesHide}
        modalTitle={props.commonProps.modalTitle}
        setAlertMsg={props.commonProps.setAlertMsg}
        setShowAlert={props.commonProps.setShowAlert}
        modalShow={props.commonProps.repliesModalShow}
        getAllComment={props.commonProps.getAllComment}
        repliesAction={props.commonProps.repliesAction}
        modalTitleDate={props.commonProps.modalTitleDate}
        updateAddRefresh={props.commonProps.refreshToggle}
        selectedTopicId={props.commonProps.selectedTopicId}
        setGetAllComment={props.commonProps.setGetAllComment}
        toggleRepliesModalShow={props.commonProps.toggleRepliesModalShow}
      />
      <Footer />
      <div className="position-relative">
        <img src={bgLeft} className="left-cicle" alt="left-cicle" />
        </div>
      <div  className="bottom-bg">
        <img src={BottomWave} alt="bottom wave" />
      </div>
    </React.Fragment>
  );
};

export default Browser;
