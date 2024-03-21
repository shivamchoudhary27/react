import React from "react";
import ModalForm from "../../form";
import { Container } from "react-bootstrap";
import StudentMinorCourseTable from "../../table";
import PageTitle from "../../../../widgets/pageTitle";
import BuildPagination from "../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../widgets/breadcrumb";
import MobileHeader from "../../../newHeader/mobileHeader";
import MobileFooter from "../../../newFooter/mobileFooter";

type Props = {
  commonProps: {
    onHide: any;
    apiStatus: any;
    totalPages: any;
    isEnrolled: any;
    isWaitlisted: any;
    filterUpdate: any;
    modalShow: boolean;
    refreshToggle: any;
    newPageRequest: any;
    minorcourseObj: any;
    toggleModalShow: any;
    minorCourseData: any;
    editHandlerById: any;
  };
};

const Browser = (props: Props) => {
  return (
    <React.Fragment>
      <MobileHeader />
      <BreadcrumbComponent
        routes={[
          { name: "Dashboard", path: "/dashboard" },
          { name: "Minor Course", path: "" }
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle pageTitle="Minor Course" gobacklink="/dashboard" />
            <StudentMinorCourseTable
              apiStatus={props.commonProps.apiStatus}
              isEnrolled={props.commonProps.isEnrolled}
              isWaitlisted={props.commonProps.isWaitlisted}
              refreshToggle={props.commonProps.refreshToggle}
              toggleModalShow={props.commonProps.toggleModalShow}
              minorCourseData={props.commonProps.minorCourseData}
              editHandlerById={props.commonProps.editHandlerById}
              updateAddRefresh={props.commonProps.refreshToggle}

            />
            <BuildPagination
              totalpages={props.commonProps.totalPages}
              activepage={props.commonProps.filterUpdate}
              getrequestedpage={props.commonProps.newPageRequest}
            />
          </Container>
        </div>
      </div>
      <ModalForm
        onHide={props.commonProps.onHide}
        modalShow={props.commonProps.modalShow}
        isEnrolled={props.commonProps.isEnrolled}
        isWaitlisted={props.commonProps.isWaitlisted}
        minorcourseObj={props.commonProps.minorcourseObj}
        updateAddRefresh={props.commonProps.refreshToggle}
        toggleModalShow={props.commonProps.toggleModalShow}
      />
      <MobileFooter />
    </React.Fragment>
  );
};

export default Browser;
