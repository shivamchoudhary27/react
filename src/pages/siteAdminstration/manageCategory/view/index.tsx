import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
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

const View = (props: Props) => {
  const commonProps = {
    id: props.id,
    apiStatus: props.apiStatus,
    modalShow: props.modalShow,
    formWeight: props.formWeight,
    formParent: props.formParent,
    editCategory: props.editCategory,
    parentWeight: props.parentWeight,
    refreshToggle: props.refreshToggle,
    resetModalForm: props.resetModalForm,
    cleanFormValues: props.cleanFormValues,
    toggleModalShow: props.toggleModalShow,
    sortedCategories: props.sortedCategories,
    setFormParentValue: props.setFormParentValue,
    setFormWeightValue: props.setFormWeightValue,
    categoryPermission: props.categoryPermission,
    updateDeleteRefresh: props.updateDeleteRefresh,
    setEditCategoryValues: props.setEditCategoryValues,
  };
  return (
    <React.Fragment>
      {isMobile ? (
        <Mobile commonProps={commonProps} />
      ) : isDesktop ? (
        <Browser commonProps={commonProps} />
      ) : (
        <Browser commonProps={commonProps} />
      )}
    </React.Fragment>
  );
};

export default View;
