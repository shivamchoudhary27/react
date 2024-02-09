import React from "react";
import CourseModal from "../../form";
import CourseTable from "../../table";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import { Container } from "react-bootstrap";
import HeaderTabs from "../../../../headerTabs";
import PageTitle from "../../../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";

type Props = {
  commonProps: {
    programId: any;
    modalShow: any;
    apiStatus: any;
    courseObj: any;
    refreshToggle: any;
    addCourseModal: any;
    cleanFormValues: any;
    toggleModalShow: any;
    editHandlerById: any;
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
          { name: "Manage Program", path: "/manageprogram" },
          { name: "Manage Courses", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle pageTitle="Manage Courses" gobacklink="/manageprogram" />
            {props.commonProps.coursePermission.canView && (
              <CourseTable
                categoryData={props.commonProps.sortedCategories}
                modalShow={props.commonProps.modalShow}
                toggleModalShow={props.commonProps.toggleModalShow}
                programId={props.commonProps.programId}
                setFormParentValue={props.commonProps.setFormParentValue}
                setFormWeightValue={props.commonProps.setFormWeightValue}
                updatedeleterefresh={props.commonProps.updateDeleteRefresh}
                setEditCategoryValues={props.commonProps.setEditCategoryValues}
                refreshcategories={props.commonProps.refreshToggle}
                cleanFormValues={props.commonProps.cleanFormValues}
                toggleCourseModal={props.commonProps.toggleCourseModal}
                editHandlerById={props.commonProps.editHandlerById}
                apiStatus={props.commonProps.apiStatus}
                coursePermission={props.commonProps.coursePermission}
              />
            )}
          </Container>
        </div>
      </div>
      <CourseModal
        show={props.commonProps.addCourseModal}
        onHide={() => props.commonProps.toggleCourseModal(false)}
        courseobj={props.commonProps.courseObj}
        programId={props.commonProps.programId}
        toggleCourseModal={props.commonProps.toggleCourseModal}
        updateAddRefresh={props.commonProps.refreshToggle}
        refreshcategories={props.commonProps.refreshToggle}
      />
      <Footer />
    </React.Fragment>
  );
};

export default Browser;
