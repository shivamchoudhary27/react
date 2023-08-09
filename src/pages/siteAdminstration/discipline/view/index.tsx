import React from "react";
import Browser from "./browser";
import Mobile from "./mobile";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { isMobile, isDesktop } from "react-device-detect";
import {
  Type_DisciplineCustomObject,
  Type_DisciplineFilterUpdate,
} from "../types/interface";

type Props = {
  diciplineData: any;
  filterUpdate: Type_DisciplineFilterUpdate;
  openAddDiscipline: () => void;
  updateInputFilters: (params: any) => void;
  editHandlerById: (params: any) => void;
  toggleModalShow: (params: boolean) => void;
  refreshToggle: () => void;
  refreshOnDeleteToggle: (value: boolean) => void;
  apiStatus: string;
  currentInstitute: number;
  modalShow: boolean;
  disciplineObj: Type_DisciplineCustomObject;
  newPageRequest: any;
  setModalShow: (params: boolean) => void;
};

const View = ({ ...props }: Props) => {
  const disciplinePermission = useSelector(
    (state: any) => state.userAuthorities.permissions.discipline
  );

  const commonProps = {
    diciplineData: props.diciplineData,
    filterUpdate: props.filterUpdate,
    openAddDiscipline: props.openAddDiscipline,
    updateInputFilters: props.updateInputFilters,
    editHandlerById: props.editHandlerById,
    toggleModalShow: props.toggleModalShow,
    refreshToggle: props.refreshToggle,
    refreshOnDeleteToggle: props.refreshOnDeleteToggle,
    apiStatus: props.apiStatus,
    currentInstitute: props.currentInstitute,
    modalShow: props.modalShow,
    disciplineObj: props.disciplineObj,
    newPageRequest: props.newPageRequest,
    setModalShow: props.setModalShow,
    disciplinePermission: disciplinePermission,
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
