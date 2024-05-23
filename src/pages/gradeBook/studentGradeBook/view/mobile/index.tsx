import React from "react";
import GradeTable from "../../table";
import { Container } from "react-bootstrap";
import HeirarchyFilter from "../../filtersNew";
import PageTitle from "../../../../../widgets/pageTitle";
import MobileHeader from "../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../newFooter/mobileFooter";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";
import FilterButtonWrapper from "../../../../../widgets/filterButtonWrapper";
import "./mobileStyles.css";

type Props = {
  commonProps: {
    apiData: any;
    courseId: any;
    getCourseId: any;
    apiStatus: string;
    coursesList: any;
    updateCourses: any;
    courseApiStatus: any;
    gradebookData: any;
    currentUserRole: any;
    setStatusfilter: any;
    statusfilter: any;
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
                  coursesList={props.commonProps.apiData}
                  getCourseId={props.commonProps.getCourseId}
                  setStatusfilter={props.commonProps.setStatusfilter}
                />
              )}
            </FilterButtonWrapper>
            <GradeTable
              courseId={props.commonProps.courseId}
              courseApiStatus={props.commonProps.courseApiStatus}
              coursesList={props.commonProps.apiData}
              apiStatus={props.commonProps.apiStatus}
              coursesList={props.commonProps.coursesList}
              gradebookData={props.commonProps.gradebookData}
              currentUserRole={props.commonProps.currentUserRole}
              statusfilter={
                props.commonProps.statusfilter.selectedValues.status
              }
            />
          </Container>
        </div>
      </div>
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
