import React from "react";
import { Container } from "react-bootstrap";
import CourseWorkLoadModal from "../../form";
import CourseWorkLoadTable from "../../table";
import Header from "../../../../../newHeader";
import Footer from "../../../../../newFooter";
import HeaderTabs from "../../../../../headerTabs";
import PageTitle from "../../../../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../../../../widgets/breadcrumb";
import { BackgroundWaveBottomLeft } from "../../../../../../widgets/backgroundElements";

type Props = {
  commonProps: {
    programId: any;
    apiStatus: any;
    modalShow: any;
    courseObj: any;
    programName: any;
    refreshToggle: any;
    addCourseModal: any;
    toggleModalShow: any;
    cleanFormValues: any;
    editHandlerById: any;
    currentInstitute: any;
    sortedCategories: any;
    coursePermission: any;
    toggleCourseModal: any;
    setFormParentValue: any;
    setFormWeightValue: any;
    updateDeleteRefresh: any;
    setEditCategoryValues: any;
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
          { name: "Timetable Management", path: "/timetable" },
          { name: "Manage Courses Work Load", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle
            pageTitle={`Manage Courses Work Load: ${props.commonProps.programName}`}
            gobacklink="/timetable"
          />
          {props.commonProps.coursePermission.canView && (
            <CourseWorkLoadTable
              programId={props.commonProps.programId}
              apiStatus={props.commonProps.apiStatus}
              modalShow={props.commonProps.modalShow}
              categoryData={props.commonProps.sortedCategories}
              toggleModalShow={props.commonProps.toggleModalShow}
              refreshcategories={props.commonProps.refreshToggle}
              cleanFormValues={props.commonProps.cleanFormValues}
              editHandlerById={props.commonProps.editHandlerById}
              coursePermission={props.commonProps.coursePermission}
              toggleCourseModal={props.commonProps.toggleCourseModal}
              setFormParentValue={props.commonProps.setFormParentValue}
              setFormWeightValue={props.commonProps.setFormWeightValue}
              updatedeleterefresh={props.commonProps.updateDeleteRefresh}
              setEditCategoryValues={props.commonProps.setEditCategoryValues}
            />
          )}
        </Container>
        <CourseWorkLoadModal
          programId={props.commonProps.programId}
          courseobj={props.commonProps.courseObj}
          show={props.commonProps.addCourseModal}
          updateAddRefresh={props.commonProps.refreshToggle}
          refreshcategories={props.commonProps.refreshToggle}
          currentInstitute={props.commonProps.currentInstitute}
          toggleCourseModal={props.commonProps.toggleCourseModal}
          onHide={() => props.commonProps.toggleCourseModal(false)}
        />
      </div>
      <Footer />
      <BackgroundWaveBottomLeft/>
    </React.Fragment>
  );
};

export default Browser;
