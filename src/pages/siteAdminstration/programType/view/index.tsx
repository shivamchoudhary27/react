import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
import { useSelector } from "react-redux";
import { isMobile, isDesktop } from "react-device-detect";

type Props = {
  apiStatus: string;
  filterUpdate: any;
  programTypeObj: any;
  modalShow: boolean;
  programTypeData: any;
  editHandlerById: any;
  currentInstitute: number;
  refreshToggle: () => void;
  openAddProgramType: () => void;
  newPageRequest: (params: number) => void;
  refreshOnDelete: (params: boolean) => void;
  toggleModalShow: (params: boolean) => void;
  updateInputFilters: (params: string) => void;
  refreshProgramData: (params: boolean) => void;
  updateDepartmentFilter: (params: string) => void;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const View: React.FunctionComponent<Props> = ({ ...props }: Props) => {
  const userAuthorities = useSelector(
    (state: any) => state.userAuthorities.permissions.programtype
  );

  const commonProps = {
    permissions: userAuthorities,
    apiStatus: props.apiStatus,
    modalShow: props.modalShow,
    filterUpdate: props.filterUpdate,
    programTypeObj: props.programTypeObj,
    programTypeData: props.programTypeData,
    editHandlerById: props.editHandlerById,
    currentInstitute: props.currentInstitute,
    setModalShow: props.setModalShow,
    refreshToggle: props.refreshToggle,
    newPageRequest: props.newPageRequest,
    refreshOnDelete: props.refreshOnDelete,
    toggleModalShow: props.toggleModalShow,
    openAddProgramType: props.openAddProgramType,
    refreshProgramData: props.refreshProgramData,
    updateInputFilters: props.updateInputFilters,
    updateDepartmentFilter: props.updateDepartmentFilter,
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
