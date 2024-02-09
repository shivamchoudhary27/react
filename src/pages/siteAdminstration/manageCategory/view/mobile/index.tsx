import React from "react";
import CategoryTable from "../../table";
import CategoryModal from "../../form";
import { Container } from "react-bootstrap";
import Addcategory from "../../addCategory";
import PageTitle from "../../../../../widgets/pageTitle";
import MobileFooter from "../../../../newFooter/mobileFooter";
import MobileHeader from "../../../../newHeader/mobileHeader";
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

const Mobile = (props: Props) => {
  return (
    <React.Fragment>
      <MobileHeader />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Manage Program", path: "/manageprogram" },
          { name: "Manage Category", path: "" },
        ]}
      />
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
                categoryData={props.commonProps.sortedCategories}
                toggleModalShow={props.commonProps.toggleModalShow}
                cleanFormValues={props.commonProps.cleanFormValues}
                refreshcategories={props.commonProps.refreshToggle}
                setFormParentValue={props.commonProps.setFormParentValue}
                setFormWeightValue={props.commonProps.setFormWeightValue}
                categoryPermission={props.commonProps.categoryPermission}
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
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
