import React from "react";
import GradeTable from "../../table";
import { Container } from "react-bootstrap";
import HeirarchyFilter from "../../filtersNew";
import PageTitle from "../../../../widgets/pageTitle";
import MobileHeader from "../../../newHeader/mobileHeader";
import MobileFooter from "../../../newFooter/mobileFooter";
import BreadcrumbComponent from "../../../../widgets/breadcrumb";
import FilterButtonWrapper from "../../../../widgets/filterButtonWrapper";

type Props = {
  commonProps: {
    apiData: any;
    courseId: any;
    getCourseId: any;
    apiStatus: string;
    updateCourses: any;
    gradebookData: any;
    currentUserRole: any;
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
              />
            )}
            </FilterButtonWrapper>
            <GradeTable
              courseId={props.commonProps.courseId}
              apiStatus={props.commonProps.apiStatus}
              gradebookData={props.commonProps.gradebookData}
            />
          </Container>
        </div>
      </div>
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
