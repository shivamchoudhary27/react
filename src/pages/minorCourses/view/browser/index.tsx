import React from "react";
// import ModalForm from "../../form";
import Header from "../../../newHeader";
import Footer from "../../../newFooter";
import { Container } from "react-bootstrap";
import HeaderTabs from "../../../headerTabs";
import StudentMinorCourseTable from "../../table";
import PageTitle from "../../../../widgets/pageTitle";
import BuildPagination from "../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../widgets/breadcrumb";

type Props = {
  commonProps: {
    onHide: any;
    apiStatus: any;
    totalPages: any;
    minorCourseData: any;
    filterUpdate: any;
    modalShow: boolean;
    // repliesAction: any;
    newPageRequest: any;
    refreshToggle: any;
    toggleModalShow: any;
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
          { name: "Minor Course", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle pageTitle="Minor Course" gobacklink="/dashboard" />
            <StudentMinorCourseTable
              apiStatus={props.commonProps.apiStatus}
              toggleModalShow={props.commonProps.toggleModalShow}
              minorCourseData={props.commonProps.minorCourseData}
            />
            <BuildPagination
              totalpages={props.commonProps.totalPages}
              getrequestedpage={props.commonProps.newPageRequest}
              activepage={props.commonProps.filterUpdate.pageNumber}
            />
          </Container>
        </div>
      </div>
      {/* <ModalForm
        onHide={props.commonProps.onHide}
        modalShow={props.commonProps.modalShow}
        refreshToggle={props.commonProps.refreshToggle}
        toggleModalShow={props.commonProps.toggleModalShow}
      /> */}
      <Footer />
    </React.Fragment>
  );
};

export default Browser;
