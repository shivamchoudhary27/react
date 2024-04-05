import React from "react";
import Header from "../../../../../newHeader";
import Footer from "../../../../../newFooter";
import HeaderTabs from "../../../../../headerTabs";
import { Button, Container } from "react-bootstrap";
import PageTitle from "../../../../../../widgets/pageTitle";
import UploadCourseUsersEnrollment from "../../uploadUsers";
import BuildPagination from "../../../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../../../widgets/breadcrumb";
import { BackgroundWaveBottomRight } from "../../../../../../widgets/backgroundElements";

type Props = {
  commonProps: {
    name: any;
    courseid: any;
    totalPages: any;
    programid: any;
    coursename: any;
    filterUpdate: any;
    refreshToggle: any;
    newPageRequest: any;
    uploadModalShow: any;
    setUploadModalShow: any;
    openAddDiscipline: any;
    DISCIPLINE_BUTTONS: any;
    DISCIPLINE_TABLE_COMPONENT: any;
    DISCIPLINE_MODAL_COMPONENT: any;
    remainingSeats:any;
  };
};

const Browser = (props: Props) => {
  
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Program Enrollment", path: "/programenrollment" },
          {
            name: props.commonProps.name,
            path: `/enrolusers/${props.commonProps.programid}/${props.commonProps.name}`,
          },
          { name: props.commonProps.coursename, path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle
              pageTitle={`Course: ${props.commonProps.coursename}`}
              gobacklink={`/enrolusers/${props.commonProps.programid}/${props.commonProps.name}`}
            />
            {props.commonProps.DISCIPLINE_BUTTONS}
            {props.commonProps.DISCIPLINE_TABLE_COMPONENT}
            <BuildPagination
              totalpages={props.commonProps.totalPages}
              activepage={props.commonProps.filterUpdate}
              getrequestedpage={props.commonProps.newPageRequest}
            />
            <Button
            disabled={props.commonProps.remainingSeats === 0}
              variant="primary"
              onClick={props.commonProps.openAddDiscipline}
            >
              Enrol User
            </Button>{" "}
            {props.commonProps.DISCIPLINE_MODAL_COMPONENT}
          </Container>
        </div>
      </div>
      <UploadCourseUsersEnrollment
        courseid={props.commonProps.courseid}
        show={props.commonProps.uploadModalShow}
        updateAddRefresh={props.commonProps.refreshToggle}
        onHide={() => props.commonProps.setUploadModalShow(false)}
        setUploadModalShow={props.commonProps.setUploadModalShow}
      />
      <Footer />
      <BackgroundWaveBottomRight/>
    </React.Fragment>
  );
};

export default Browser;
