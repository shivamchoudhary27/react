import React from "react";
import Filters from "../../filters";
import DiciplineModal from "../../form";
import DiciplineTable from "../../table";
import { Container } from "react-bootstrap";
import PageTitle from "../../../../../widgets/pageTitle";
import Errordiv from "../../../../../widgets/alert/errordiv";
import { Type_DisciplineFilterUpdate } from "../../type/type";
import MobileHeader from "../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../newFooter/mobileFooter";
import BuildPagination from "../../../../../widgets/pagination";
import { Interface_DisciplineCustomObject } from "../../type/interface";

type Props = {
  commonProps: {
    apiStatus: string;
    modalShow: boolean;
    diciplineData: any;
    newPageRequest: any;
    setFilterUpdate: any;
    currentInstitute: number;
    disciplinePermission: any;
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
};

const Mobile = ({ commonProps }: Props) => {
  // <<< ===== JSX CUSTOM COMPONENTS ===== >>>
  const DISCIPLINE_TABLE_COMPONENT = (
    <DiciplineTable
      apiStatus={commonProps.apiStatus}
      filterUpdate={commonProps.filterUpdate}
      setFilterUpdate={commonProps.setFilterUpdate}
      editHandlerById={commonProps.editHandlerById}
      diciplineData={commonProps.diciplineData.items}
      currentInstitute={commonProps.currentInstitute}
      disciplinePermissions={commonProps.disciplinePermission}
      toggleModalShow={commonProps.toggleModalShow}
      refreshDisciplineData={commonProps.refreshToggle}
      refreshOnDelete={commonProps.refreshOnDeleteToggle}
    />
  );

  const DISCIPLINE_MODAL_COMPONENT = (
    <DiciplineModal
      show={commonProps.modalShow}
      disciplineobj={commonProps.disciplineObj}
      currentInstitute={commonProps.currentInstitute}
      togglemodalshow={commonProps.toggleModalShow}
      onHide={() => commonProps.setModalShow(false)}
      refreshDisciplineData={commonProps.refreshToggle}
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
            apiStatus={commonProps.apiStatus}
            disciplinePermissions={commonProps.disciplinePermission}
            openAddDiscipline={commonProps.openAddDiscipline}
            updateInputFilters={commonProps.updateInputFilters}
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
            getrequestedpage={commonProps.newPageRequest}
            activepage={commonProps.filterUpdate.pageNumber}
            totalpages={commonProps.diciplineData.pager.totalPages}
          />
          {DISCIPLINE_MODAL_COMPONENT}
        </Container>
      </div>
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
