import React from "react";
import GradeTable from "../../table";
import Header from "../../../newHeader";
import Footer from "../../../newFooter";
import { Container } from "react-bootstrap";
import HeaderTabs from "../../../headerTabs";
import HeirarchyFilter from "../../filtersNew";
import PageTitle from "../../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../../widgets/breadcrumb";
import BottomWave from "../../../../assets/images/background/bg-bottom.svg";

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
            />
          )}
          <GradeTable
            courseId={props.commonProps.courseId}
            apiStatus={props.commonProps.apiStatus}
            gradebookData={props.commonProps.gradebookData}
          />
        </Container>
      </div>
      <Footer />
      <div  className="bottom-bg">
        <img src={BottomWave} alt="bottom wave" />
      </div>
    </React.Fragment>
  );
};

export default Browser;
