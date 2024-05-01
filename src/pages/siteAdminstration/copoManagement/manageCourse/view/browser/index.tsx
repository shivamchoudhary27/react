import React from "react";
import CourseModal from "../../form";
import CourseTable from "../../table";
import Header from "../../../../../newHeader";
import Footer from "../../../../../newFooter";
import { Container } from "react-bootstrap";
import HeaderTabs from "../../../../../headerTabs";
import PageTitle from "../../../../../../widgets/pageTitle";
import BuildPagination from "../../../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../../../widgets/breadcrumb";
import { useParams } from "react-router";

type Props = {
  commonProps: {
    programId: any;
    modalShow: any;
    apiStatus: any;
    courseObj: any;
    totalPages: any;
    filterUpdate: any;
    refreshToggle: any;
    newPageRequest: any;
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
  const { _, name } = useParams();
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "CO/PO Management", path: "/copomanagement" },
          { name: "Configure Co/Po", path: "" },
          ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle pageTitle={`${name}: Configure Co/Po`} gobacklink="/copomanagement" />
            {props.commonProps.coursePermission.canView && (
              <CourseTable
                apiStatus={props.commonProps.apiStatus}
                modalShow={props.commonProps.modalShow}
                programId={props.commonProps.programId}
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
            <BuildPagination
              totalpages={props.commonProps.totalPages}
              activepage={props.commonProps.filterUpdate.pageNumber}
              getrequestedpage={props.commonProps.newPageRequest}
            />
          </Container>
        </div>
      </div>
      <CourseModal
        show={props.commonProps.addCourseModal}
        courseobj={props.commonProps.courseObj}
        programId={props.commonProps.programId}
        updateAddRefresh={props.commonProps.refreshToggle}
        refreshcategories={props.commonProps.refreshToggle}
        toggleCourseModal={props.commonProps.toggleCourseModal}
        onHide={() => props.commonProps.toggleCourseModal(false)}
      />
      <Footer />
    </React.Fragment>
  );
};

export default Browser;
