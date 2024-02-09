import React from "react";
import ModalForm from "../../form";
import { Container } from "react-bootstrap";
import Header from "../../../../../newHeader";
import Footer from "../../../../../newFooter";
import EnrolUserTable from "../../courseTable";
import HeaderTabs from "../../../../../headerTabs";
import PageTitle from "../../../../../../widgets/pageTitle";
import Errordiv from "../../../../../../widgets/alert/errordiv";
import BreadcrumbComponent from "../../../../../../widgets/breadcrumb";
import TableSkeleton from "../../../../../../widgets/skeleton/table";

type Props = {
  commonProps: {
    name: any;
    apiStatus: any;
    programid: any;
    modalShow: any;
    refreshToggle: any;
    cleanFormValues: any;
    toggleModalShow: any;
    editHandlerById: any;
    sortedCategories: any;
    maxMinorCoursesObj: any;
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
          { name: "Programs Enrollment", path: "/programenrollment" },
          { name: props.commonProps.name, path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle
              pageTitle={`Program: <span>${props.commonProps.name}</span>`}
              gobacklink={`/manageprogramenrollment/${props.commonProps.programid}/${props.commonProps.name}`}
            />
            {props.commonProps.sortedCategories.length !== 0 ? (
              <EnrolUserTable
                name={props.commonProps.name}
                modalShow={props.commonProps.modalShow}
                programId={props.commonProps.programid}
                apiStatus={props.commonProps.apiStatus}
                categoryData={props.commonProps.sortedCategories}
                toggleModalShow={props.commonProps.toggleModalShow}
                refreshcategories={props.commonProps.refreshToggle}
                cleanFormValues={props.commonProps.cleanFormValues}
                editHandlerById={props.commonProps.editHandlerById}
                setFormParentValue={props.commonProps.setFormParentValue}
                setFormWeightValue={props.commonProps.setFormWeightValue}
                updatedeleterefresh={props.commonProps.updateDeleteRefresh}
                setEditCategoryValues={props.commonProps.setEditCategoryValues}
              />
            ) : (
              (props.commonProps.apiStatus === "started" &&
                props.commonProps.sortedCategories.length === 0 && (
                  <TableSkeleton numberOfRows={5} numberOfColumns={4} />
                )) ||
              (props.commonProps.apiStatus === "finished" &&
                props.commonProps.sortedCategories.length === 0 && (
                  <Errordiv msg="No record found!" cstate className="mt-3" />
                ))
            )}
          </Container>
        </div>
      </div>
      <ModalForm
        modalShow={props.commonProps.modalShow}
        programId={props.commonProps.programid}
        toggleModalShow={props.commonProps.toggleModalShow}
        refreshcategories={props.commonProps.refreshToggle}
        onHide={() => props.commonProps.toggleModalShow(false)}
        maxMinorCoursesObj={props.commonProps.maxMinorCoursesObj}
      />

      <Footer />
    </React.Fragment>
  );
};

export default Browser;
