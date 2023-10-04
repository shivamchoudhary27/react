import Filters from "../../filters";
import ProgramTable from "../../table";
import AddProgramModal from "../../form";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import { Container } from "react-bootstrap";
import HeaderTabs from "../../../../headerTabs";
import PageTitle from "../../../../../widgets/pageTitle";
import BuildPagination from "../../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";

type Props = {
  commonProps: {
    apiStatus: string;
    permissions: any;
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
};

const Browser: React.FunctionComponent<Props> = ({ commonProps }: Props) => {
  // <<< ===== JSX CUSTOM COMPONENTS ===== >>>
  const ADDPROGRAM_MODAL_COMPONENT = (
    <AddProgramModal
      show={commonProps.modalShow}
      programtypeobj={commonProps.programTypeObj}
      togglemodalshow={commonProps.toggleModalShow}
      refreshprogramdata={commonProps.refreshToggle}
      currentInstitute={commonProps.currentInstitute}
      onHide={() => commonProps.toggleModalShow(false)}
    />
  );

  const PROGRAM_TYPE_COMPONENT = (
    <ProgramTable
      apiStatus={commonProps.apiStatus}
      refreshOnDelete={commonProps.refreshOnDelete}
      editHandlerById={commonProps.editHandlerById}
      toggleModalShow={commonProps.toggleModalShow}
      refreshProgramData={commonProps.refreshToggle}
      currentInstitute={commonProps.currentInstitute}
      programtypePermissions={commonProps.permissions}
      programTypeData={commonProps.programTypeData.items}
    />
  );

  return (
    <>
      <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Manage Program", path: "/manageprogram" },
          { name: "Program Type", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle={`Program Type`} gobacklink="/manageprogram" />
          <Filters
            apiStatus={commonProps.apiStatus}
            programtypePermissions={commonProps.permissions}
            openAddProgramType={commonProps.openAddProgramType}
            updateinputfilters={commonProps.updateInputFilters}
            // updateDepartment={commonProps.updateDepartmentFilter}
          />
          {/* {PROGRAM_TYPE_BUTTON} */}
          {ADDPROGRAM_MODAL_COMPONENT}
          {PROGRAM_TYPE_COMPONENT}
          <BuildPagination
            getrequestedpage={commonProps.newPageRequest}
            activepage={commonProps.filterUpdate.pageNumber}
            totalpages={commonProps.programTypeData.pager.totalPages}
          />
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Browser;
