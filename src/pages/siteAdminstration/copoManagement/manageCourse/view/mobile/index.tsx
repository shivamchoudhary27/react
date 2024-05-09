import React from "react";
import CourseModal from "../../form";
import CourseTable from "../../table";
import { Container } from "react-bootstrap";
import PageTitle from "../../../../../../widgets/pageTitle";
import MobileHeader from "../../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../../newFooter/mobileFooter";
import BreadcrumbComponent from "../../../../../../widgets/breadcrumb";
import { useParams } from "react-router-dom";

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


const Mobile = (props: Props) => {
  const { _, name } = useParams();
  return (
    <React.Fragment>
      <MobileHeader />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "CO/PO Management", path: "/copomanagement" },
          { name: name, path: "" },
          ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle pageTitle={`${name}: Configure Co/Po`} gobacklink="/copomanagement" />
            {props.commonProps.coursePermission.canView && (
              <CourseTable
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
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
