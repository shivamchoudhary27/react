import React from "react";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import HeaderTabs from "../../../../headerTabs";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";
import PageTitle from "../../../../../widgets/pageTitle";
import BuildPagination from "../../../../../widgets/pagination";
import Errordiv from "../../../../../widgets/alert/errordiv";
import { Container } from "react-bootstrap";
import BrowserFilters from "./filters";
import BrowserDiciplineModal from "./form";
import BrowserDiciplineTable from "./table";
import { Type_DisciplineFilterUpdate } from "../../type/type";
import { Interface_DisciplineCustomObject } from "../../type/interface";

type Props = {
  commonProps: {
    diciplineData: any;
    filterUpdate: Type_DisciplineFilterUpdate;
    openAddDiscipline: () => void;
    updateInputFilters: (params: any) => void;
    editHandlerById: any;
    toggleModalShow: (params: boolean) => void;
    refreshToggle: () => void;
    refreshOnDeleteToggle: (value: boolean) => void;
    apiStatus: string;
    currentInstitute: number;
    modalShow: boolean;
    disciplineObj: Interface_DisciplineCustomObject;
    newPageRequest: any;
    setModalShow: (params: boolean) => void;
    disciplinePermission: any;
  };
};

const Browser = ({ commonProps }: Props) => {
  // <<< ===== JSX CUSTOM COMPONENTS ===== >>>
  const DISCIPLINE_TABLE_COMPONENT = (
    <BrowserDiciplineTable
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
    <BrowserDiciplineModal
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
      <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Manage Program", path: "/manageprogram" },
          { name: "Discipline", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          {/* <PageTitle pageTitle={`${currentInstitueName}: Discipline`} gobacklink="/manageprogram" />           */}
          <PageTitle pageTitle={`Discipline`} gobacklink="/manageprogram" />
          <BrowserFilters
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
      <Footer />
    </React.Fragment>
  );
};

export default Browser;
