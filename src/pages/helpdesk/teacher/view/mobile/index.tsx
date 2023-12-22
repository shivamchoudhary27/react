
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
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";

type Props = {
  commonProps: {
    onHide: any;
    apiStatus: any;
    enquiryData:any[];
    modalShow: boolean;
    onRepliesHide: any;
    repliesAction: any;
    selectedTopic: any;
    toggleModalShow: any;
    repliesModalShow: any;
    toggleRepliesModalShow: any;
  };
};

const Mobile = (props: Props) => {

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
            <Filter toggleModalShow={props.commonProps.toggleModalShow} />
            
            <TeacherHelpdeskTable
              enquiryData={props.commonProps.enquiryData}
              apiStatus={props.commonProps.apiStatus}
              toggleRepliesModalShow={props.commonProps.toggleRepliesModalShow}
            />
            {/* <BuildPagination
              totalpages={props.commonProps.timeslotListPage}
              activepage={props.commonProps.filterUpdate}
              getrequestedpage={props.commonProps.newPageRequest}
            /> */}
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
        toggleRepliesModalShow={props.commonProps.toggleRepliesModalShow}
      />
      <Footer />
    </React.Fragment>
  );
};

export default Mobile;
