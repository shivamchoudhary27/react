import React from "react";
import MobileHeader from "../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../newFooter/mobileFooter";
import PageTitle from "../../../../../widgets/pageTitle";
import BuildPagination from "../../../../../widgets/pagination";
import Errordiv from "../../../../../widgets/alert/errordiv";
import { Container } from "react-bootstrap";
import DiciplineModal from "../../form";
import DiciplineTable from "../../table";
import Filters from "../../filters";
import {
  Type_DisciplineFilterUpdate,
  Type_DisciplineCustomObject,
} from "../../types/interface";

type Props = {
  commonProps: {
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
    disciplinePermission: any;
  };
};

const Mobile = ({ commonProps }: Props) => {
  // <<< ===== JSX CUSTOM COMPONENTS ===== >>>
  const DISCIPLINE_TABLE_COMPONENT = (
    <DiciplineTable
      diciplineData={commonProps.diciplineData.items}
      editHandlerById={commonProps.editHandlerById}
      toggleModalShow={commonProps.toggleModalShow}
      refreshDisciplineData={commonProps.refreshToggle}
      refreshOnDelete={commonProps.refreshOnDeleteToggle}
      apiStatus={commonProps.apiStatus}
      currentInstitute={commonProps.currentInstitute}
      disciplinePermissions={commonProps.disciplinePermission}
    />
  );

  const DISCIPLINE_MODAL_COMPONENT = (
    <DiciplineModal
      show={commonProps.modalShow}
      onHide={() => commonProps.setModalShow(false)}
      togglemodalshow={commonProps.toggleModalShow}
      disciplineobj={commonProps.disciplineObj}
      refreshDisciplineData={commonProps.refreshToggle}
      currentInstitute={commonProps.currentInstitute}
    />
  );

  return (
    <React.Fragment>
      <MobileHeader />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          {/* <PageTitle pageTitle={`${currentInstitueName}: Discipline`} gobacklink="/manageprogram" />           */}
          <PageTitle pageTitle={`Discipline`} gobacklink="/manageprogram" />
          <Filters
            openAddDiscipline={commonProps.openAddDiscipline}
            updateInputFilters={commonProps.updateInputFilters}
            disciplinePermissions={commonProps.disciplinePermission}
          />
          {/* {DISCIPLINE_BUTTONS} */}
          {!commonProps.disciplinePermission.canView ? (
            <Errordiv
              msg="You don't have permission to view discipline."
              cstate
              className="mt-3"
            />
          ) : (
            DISCIPLINE_TABLE_COMPONENT
          )}
          <BuildPagination
            totalpages={commonProps.diciplineData.pager.totalPages}
            activepage={commonProps.filterUpdate.pageNumber}
            getrequestedpage={commonProps.newPageRequest}
          />
          {DISCIPLINE_MODAL_COMPONENT}
        </Container>
      </div>
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
