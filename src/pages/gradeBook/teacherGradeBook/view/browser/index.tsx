import React, { Suspense } from "react";
// import GradeTable from "../../table";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import { Container } from "react-bootstrap";
import HeaderTabs from "../../../../headerTabs";
import HeirarchyFilter from "../../filtersNew";
import PageTitle from "../../../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";
import BottomWave from "../../../../../assets/images/background/bg-bottom.svg";
import AllStudentTable from "../../allStudentTable";
import BuildPagination from "../../../../../widgets/pagination";

type Props = {
  commonProps: {
    apiData: any;
    courseId: any;
    getCourseId: any;
    apiStatus: string;
    StudentData: any;
    updateCourses: any;
    gradebookData: any;
    currentUserRole: any;
    courseName: any;
    setStatusfilter: any;
    setStudentId: any;
    courseApiStatus: any;
    statusfilter: any;
    studentId: any;
    filterUpdate: any;
    newPageRequest: any;
    totalPages: any;
  };
};

const Browser = (props: Props) => {
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="gradebook" />
      <BreadcrumbComponent
        routes={[
          { name: "Dashboard", path: "/dashboard" },
          { name: "Gradebook", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle="Gradebook" gobacklink="/dashboard" />
          {props.commonProps.currentUserRole !== undefined && (
            <HeirarchyFilter
              updateCourses={() => {}}
              getCourseStatus={() => {}}
              setUserCoursesData={() => {}}
              StudentData={props.commonProps.StudentData}
              coursesList={props.commonProps.apiData}
              getCourseId={props.commonProps.getCourseId}
              setStatusfilter={props.commonProps.setStatusfilter}
              setStudentId={props.commonProps.setStudentId}
            />
          )}
          <Suspense fallback={<h3>Loading...</h3>}>
            <AllStudentTable
              studentId={props.commonProps.studentId}
              StudentData={props.commonProps.StudentData}
              courseApiStatus={props.commonProps.courseApiStatus}
              courseId={props.commonProps.courseId}
              courseName={props.commonProps.courseName}
              coursesList={props.commonProps.coursesList}
              apiStatus={props.commonProps.apiStatus}
            />
          </Suspense>
          <BuildPagination
            totalpages={props.commonProps.totalPages}
            activepage={props.commonProps.filterUpdate.pageNumber}
            getrequestedpage={props.commonProps.newPageRequest}
          />
        </Container>
      </div>
      <Footer />
      <div className="bottom-bg">
        <img src={BottomWave} alt="bottom wave" />
      </div>
    </React.Fragment>
  );
};

export default Browser;
