import React from "react";
import CategoryModal from "../../form";
import CategoryTable from "../../table";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import Addcategory from "../../addCategory";
import { Container } from "react-bootstrap";
import HeaderTabs from "../../../../headerTabs";
import PageTitle from "../../../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";

type Props = {
  commonProps: {
    id: any;
    modalShow: any;
    apiStatus: any;
    formWeight: any;
    formParent: any;
    editCategory: any;
    parentWeight: any;
    refreshToggle: any;
    resetModalForm: any;
    cleanFormValues: any;
    toggleModalShow: any;
    sortedCategories: any;
    categoryPermission: any;
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
          { name: "Manage Category", path: "" },
        ]}
      />{" "}
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle
              pageTitle="Manage Categories"
              gobacklink="/manageprogram"
            />
            {props.commonProps.categoryPermission.canView && (
              <CategoryTable
                id={props.commonProps.id}
                modalShow={props.commonProps.modalShow}
                apiStatus={props.commonProps.apiStatus}
                refreshcategories={props.commonProps.refreshToggle}
                categoryData={props.commonProps.sortedCategories}
                cleanFormValues={props.commonProps.cleanFormValues}
                toggleModalShow={props.commonProps.toggleModalShow}
                setFormParentValue={props.commonProps.setFormParentValue}
                categoryPermission={props.commonProps.categoryPermission}
                setFormWeightValue={props.commonProps.setFormWeightValue}
                updatedeleterefresh={props.commonProps.updateDeleteRefresh}
                setEditCategoryValues={props.commonProps.setEditCategoryValues}
              />
            )}

            <Addcategory
              latestparentweight={props.commonProps.parentWeight}
              toggleModalShow={props.commonProps.toggleModalShow}
              // modalShow={props.commonProps.modalShow}
              setFormParentValue={props.commonProps.setFormParentValue}
              setFormWeightValue={props.commonProps.setFormWeightValue}
              // onClick={props.commonProps.cleanFormValues}
              setEditCategoryValues={props.commonProps.setEditCategoryValues}
            />
            <CategoryModal
              show={props.commonProps.modalShow}
              weight={props.commonProps.formWeight}
              parent={props.commonProps.formParent}
              editCategory={props.commonProps.editCategory}
              onHide={() => props.commonProps.resetModalForm()}
              refreshcategories={props.commonProps.refreshToggle}
              toggleModalShow={props.commonProps.toggleModalShow}
            />
          </Container>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Browser;
