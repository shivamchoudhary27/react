
import "./mobileStyles.css";
import React from "react";
import MobileHeader from "../../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../../newFooter/mobileFooter";
import BreadcrumbComponent from "../../../../../../widgets/breadcrumb";
import { Container } from "react-bootstrap";
import PageTitle from "../../../../../../widgets/pageTitle";
import FilterProgramDropdownStudent from "../../filters";
import GradeTable from "../../table";

type Props = {
  commonProps: {
    studentData: any;
    setStudentId: any;
    userId: any;
    setstatusfilter: any;
    studentId: any;
    statusfilter: any;
    apiStatus: any;
    courseName: any;
  };
};

const Mobile = (props: Props) => {
  return (
    <React.Fragment>
      <MobileHeader />
      <BreadcrumbComponent
        routes={[
          { name: "Dashboard", path: "/dashboard" },
          { name: "Gradebook", path: "/gradebook" },
          { name: props.commonProps.courseName, path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle
            pageTitle={`Gradebook: ${props.commonProps.courseName}`}
            gobacklink="/gradebook"
          />
          <FilterProgramDropdownStudent
            StudentData={props.commonProps.StudentData}
            setStudentId={props.commonProps.setStudentId}
            userId={props.commonProps.userId}
            setstatusfilter={props.commonProps.setstatusfilter}
          />
          <GradeTable
            studentId={props.commonProps.studentId}
            statusfilter={props.commonProps.statusfilter}
            apiStatus={props.commonProps.apiStatus}
          />
        </Container>
      </div>
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
