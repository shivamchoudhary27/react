import React, { Suspense } from "react";
// import GradeTable from "../../../studentGradeBook/index";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import { Container } from "react-bootstrap";
import HeaderTabs from "../../../../headerTabs";
import HeirarchyFilter from "../../filtersNew";
import PageTitle from "../../../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";
import BottomWave from "../../../../../assets/images/background/bg-bottom.svg";
import GradeTable from "../../table";

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
              coursesList={props.commonProps.apiData}
              getCourseId={props.commonProps.getCourseId}
              setStatusfilter={props.commonProps.setStatusfilter}
            />
          )}
          <Suspense fallback={<h3>Loading...</h3>}>
            <GradeTable
              courseId={props.commonProps.courseId}
              courseApiStatus={props.commonProps.courseApiStatus}
              apiStatus={props.commonProps.apiStatus}
              coursesList={props.commonProps.coursesList}
              gradebookData={props.commonProps.gradebookData}
              currentUserRole={props.commonProps.currentUserRole}
              statusfilter={
                props.commonProps.statusfilter.selectedValues.status
              }
            />
          </Suspense>
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
