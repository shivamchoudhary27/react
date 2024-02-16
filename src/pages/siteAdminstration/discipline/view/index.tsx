import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { isMobile, isDesktop } from "react-device-detect";
import { Type_DisciplineFilterUpdate } from "../type/type";
// import { useSelector } from "react-redux/es/hooks/useSelector";
import { useSelector } from "react-redux";
import { Interface_DisciplineCustomObject } from "../type/interface";

type Props = {
  apiStatus: string;
  modalShow: boolean;
  diciplineData: any;
  newPageRequest: any;
  currentInstitute: number;
  filterUpdate: Type_DisciplineFilterUpdate;
  disciplineObj: Interface_DisciplineCustomObject;
  refreshToggle: () => void;
  openAddDiscipline: () => void;
  updateInputFilters: (params: any) => void;
  toggleModalShow: (params: boolean) => void;
  refreshOnDeleteToggle: (value: boolean) => void;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  editHandlerById: (params: Interface_DisciplineCustomObject) => void;
};

const View = ({ ...props }: Props) => {
  const disciplinePermission = useSelector(
    (state: any) => state.userAuthorities.permissions.discipline
  );

  const commonProps = {
    apiStatus: props.apiStatus,
    modalShow: props.modalShow,
    filterUpdate: props.filterUpdate,
    disciplineObj: props.disciplineObj,
    diciplineData: props.diciplineData,
    newPageRequest: props.newPageRequest,
    currentInstitute: props.currentInstitute,
    disciplinePermission: disciplinePermission,
    setModalShow: props.setModalShow,
    refreshToggle: props.refreshToggle,
    toggleModalShow: props.toggleModalShow,
    editHandlerById: props.editHandlerById,
    openAddDiscipline: props.openAddDiscipline,
    updateInputFilters: props.updateInputFilters,
    refreshOnDeleteToggle: props.refreshOnDeleteToggle,
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
