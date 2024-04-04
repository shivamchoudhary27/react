import Filters from "../../filters";
import ProgramTable from "../../table";
import AddProgramModal from "../../form";
import { Container } from "react-bootstrap";
import PageTitle from "../../../../../widgets/pageTitle";
import MobileFooter from "../../../../newFooter/mobileFooter";
import MobileHeader from "../../../../newHeader/mobileHeader";
import BuildPagination from "../../../../../widgets/pagination";

type Props = {
  commonProps: {
    apiStatus: string;
    permissions: any;
    filterUpdate: any;
    programTypeObj: any;
    modalShow: boolean;
    setFilterUpdate: any;
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

const Mobile: React.FunctionComponent<Props> = ({ commonProps }: Props) => {
  // <<< ===== JSX CUSTOM COMPONENTS ===== >>>
  const ADDPROGRAM_MODAL_COMPONENT = (
    <AddProgramModal
      show={commonProps.modalShow}
      onHide={() => commonProps.toggleModalShow(false)}
      programtypeobj={commonProps.programTypeObj}
      togglemodalshow={commonProps.toggleModalShow}
      refreshprogramdata={commonProps.refreshToggle}
      currentInstitute={commonProps.currentInstitute}
    />
  );

  const PROGRAM_TYPE_COMPONENT = (
    <ProgramTable
      apiStatus={commonProps.apiStatus}
      filterUpdate={commonProps.filterUpdate}
      setFilterUpdate={commonProps.setFilterUpdate}
      editHandlerById={commonProps.editHandlerById}
      toggleModalShow={commonProps.toggleModalShow}
      refreshOnDelete={commonProps.refreshOnDelete}
      refreshProgramData={commonProps.refreshToggle}
      currentInstitute={commonProps.currentInstitute}
      programtypePermissions={commonProps.permissions}
      programTypeData={commonProps.programTypeData.items}
    />
  );

  return (
    <>
      <MobileHeader />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle={`Program Type`} gobacklink="/manageprogram" />
          <Filters
            apiStatus={commonProps.apiStatus}
            programtypePermissions={commonProps.permissions}
            updateinputfilters={commonProps.updateInputFilters}
            openAddProgramType={commonProps.openAddProgramType}
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
      <MobileFooter />
    </>
  );
};

export default Mobile;
