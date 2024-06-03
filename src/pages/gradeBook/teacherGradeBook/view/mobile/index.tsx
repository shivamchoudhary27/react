import React from "react";
import GradeTable from "../../studentViewGradebook/table";
import { Container } from "react-bootstrap";
import HeirarchyFilter from "../../filtersNew";
import PageTitle from "../../../../../widgets/pageTitle";
import MobileHeader from "../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../newFooter/mobileFooter";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";
import FilterButtonWrapper from "../../../../../widgets/filterButtonWrapper";
import AllStudentTable from "../../allStudentTable";
import "./mobileStyles.css";
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
    statusfilter: any;
    studentId: any;
    filterUpdate: any;
    newPageRequest: any;
    totalPages: any;
  };
};



const Mobile = (props: Props) => {
  return (
    <React.Fragment>
      <MobileHeader />
      <BreadcrumbComponent
        routes={[
          { name: "Dashboard", path: "/dashboard" },
          { name: "Gradebook", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle pageTitle="Gradebook" gobacklink="/dashboard" />
            <FilterButtonWrapper>
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
            </FilterButtonWrapper>
            <AllStudentTable
              studentId={props.commonProps.studentId}
              StudentData={props.commonProps.StudentData}
              courseId={props.commonProps.courseId}
              courseName={props.commonProps.courseName}
              apiStatus={props.commonProps.apiStatus}
            />
            <BuildPagination
              totalpages={props.commonProps.totalPages}
              activepage={props.commonProps.filterUpdate.pageNumber}
              getrequestedpage={props.commonProps.newPageRequest}
            />
          </Container>
        </div>
      </div>
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
