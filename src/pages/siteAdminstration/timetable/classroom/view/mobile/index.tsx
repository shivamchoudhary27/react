import React from "react";
import Filters from "../../filters";
import ClassRoomModal from "../../form";
import ClassRoomTable from "../../table";
import { Container } from "react-bootstrap";
import PageTitle from "../../../../../../widgets/pageTitle";
import MobileHeader from "../../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../../newFooter/mobileFooter";
import BuildPagination from "../../../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../../../widgets/breadcrumb";

type Props = {
  commonProps: {
    apiStatus: any;
    modalShow: any;
    classroomObj: any;
    filterUpdate: any;
    refreshToggle: any;
    setFilterUpdate:any;
    departmentList: any;
    newPageRequest: any;
    toggleModalShow: any;
    currentInstitute: any;
    updateInputFilters: any;
    resetClassroomForm: any;
    classroomApiResponseData: any;
    filterHandlerByDepartment: any;
    updateClassroomFilterByDepartment: any;
    editHandlerById: any;
    refreshOnDeleteToggle: any;
  };
};

const Mobile = (props: Props) => {
  // <<< ==== COMPONENTS START ==== >>>
  const CLASSROOM_TABLE_COMPONENT = (
    <ClassRoomTable
      apiStatus={props.commonProps.apiStatus}
      currentInstitute={props.commonProps.currentInstitute}
      classroomData={props.commonProps.classroomApiResponseData}
      editHandlerById={props.commonProps.editHandlerById}
      toggleModalShow={props.commonProps.toggleModalShow}
      refreshClassroomData={props.commonProps.refreshToggle}
      refreshOnDelete={props.commonProps.refreshOnDeleteToggle}
      setFilterUpdate={props.commonProps.setFilterUpdate}
      filterUpdate={props.commonProps.filterUpdate}
    />
  );

  const CLASSROOM_MODAL_COMPONENT = (
    <ClassRoomModal
      show={props.commonProps.modalShow}
      classroomObj={props.commonProps.classroomObj}
      currentInstitute={props.commonProps.currentInstitute}
      departmentList={props.commonProps.departmentList}
      togglemodalshow={props.commonProps.toggleModalShow}
      refreshClassroomData={props.commonProps.refreshToggle}
      onHide={() => props.commonProps.toggleModalShow(false)}
    />
  );
  // <<< ==== END COMPONENTS ==== >>>
  return (
    <React.Fragment>
      <MobileHeader />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Timetable Management", path: "/timetable" },
          { name: "Manage Classroom", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle="Manage Classroom" gobacklink="/timetable" />
          <Filters
            apiStatus={props.commonProps.apiStatus}
            departmentList={props.commonProps.departmentList}
            toggleModalShow={props.commonProps.toggleModalShow}
            refreshClassroomData={props.commonProps.refreshToggle}
            updateInputFilters={props.commonProps.updateInputFilters}
            resetClassroomForm={props.commonProps.resetClassroomForm}
            filterHandlerByDepartment={
              props.commonProps.filterHandlerByDepartment
            }
            updateClassroomFilter={
              props.commonProps.updateClassroomFilterByDepartment
            }
          />
          {CLASSROOM_TABLE_COMPONENT}
          <BuildPagination
            totalpages={
              props.commonProps.classroomApiResponseData.pager.totalPages
            }
            activepage={props.commonProps.filterUpdate.pageNumber}
            getrequestedpage={props.commonProps.newPageRequest}
          />
          {CLASSROOM_MODAL_COMPONENT}
        </Container>
      </div>
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
