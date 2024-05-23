import React, { Suspense } from "react";

import BreadcrumbComponent from "../../../../../../widgets/breadcrumb";
import { Container } from "react-bootstrap";
import PageTitle from "../../../../../../widgets/pageTitle";
import Header from "../../../../../newHeader";
import HeaderTabs from "../../../../../headerTabs";
import FilterProgramDropdownStudent from "../../filters";
import GradeTable from "../../table";
import Footer from "../../../../../newFooter";
import BottomWave from "../../../../../../assets/images/background/bg-bottom.svg";

type Props = {
  commonProps: {
    StudentData: any;
    setStudentId: any;
    userId: any;
    setstatusfilter: any;
    studentId: any;
    statusfilter: any;
    apiStatus: any;
    courseName: any;
  };
};

const Browser = (props: Props) => {
  return (
    <>
      <Header />
      <HeaderTabs activeTab="gradebook" />
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
      <Footer />
      <div className="bottom-bg">
        <img src={BottomWave} alt="bottom wave" />
      </div>
    </>
  );
};

export default Browser;
