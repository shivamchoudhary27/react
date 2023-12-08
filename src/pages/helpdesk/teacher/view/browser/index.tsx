import React from "react";
import Filter from "../../filter";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import { Container } from "react-bootstrap";
import TeacherHelpdeskTable from "../../table";
import HeaderTabs from "../../../../headerTabs";
import PageTitle from "../../../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";
import NewRequestForm from "../../newRequestForm";
import RepliesForm from "../../repliesForm";

type Props = {
  commonProps: {
    onHide: any;
    dummyData: any[];
    modalShow: boolean;
    toggleModalShow: any;
    repliesModalShow: any;
    toggleRepliesModalShow: any;
    onRepliesHide: any;
    repliesAction: any
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
            <Filter toggleModalShow={props.commonProps.toggleModalShow} />
            <TeacherHelpdeskTable
              dummyData={props.commonProps.dummyData}
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

export default Browser;
