import React from "react";
import Filters from "../../filters";
import WorkLoadModal from "../../form";
import WorkLoadTable from "../../table";
import { Container } from "react-bootstrap";
import PageTitle from "../../../../../../widgets/pageTitle";
import MobileHeader from "../../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../../newFooter/mobileFooter";
import BuildPagination from "../../../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../../../widgets/breadcrumb";

type Props = {
  commonProps: {
    modalShow: any;
    apiStatus: any;
    classroomObj: any;
    filterUpdate: any;
    refreshToggle: any;
    newPageRequest: any;
    departmentList: any;
    workLoadApiData: any;
    toggleModalShow: any;
    setFilterUpdate: any;
    currentInstitute: any;
    updateInputFilters: any;
    resetClassroomForm: any;
    updateDepartmentFilter: any;
    workLoadApiResponseData: any;
    filterHandlerByDepartment: any;
    workLoadApiResponseDataPage: any;
  };
};

const Browser = (props: Props) => {
  const WORKLOAD_TABLE_COMPONENT = (
    <WorkLoadTable
      apiStatus={props.commonProps.apiStatus}
      filterUpdate={props.commonProps.filterUpdate}
      workLoadData={props.commonProps.workLoadApiData}
      setFilterUpdate={props.commonProps.setFilterUpdate}
    />
  );

  const WORKLOAD_MODAL_COMPONENT = (
    <WorkLoadModal
      show={props.commonProps.modalShow}
      workLoadObj={props.commonProps.classroomObj}
      filterUpdate={props.commonProps.filterUpdate}
      departmentList={props.commonProps.departmentList}
      togglemodalshow={props.commonProps.toggleModalShow}
      currentInstitute={props.commonProps.currentInstitute}
      refreshClassroomData={props.commonProps.refreshToggle}
      workLoadApiResponseData={props.commonProps.workLoadApiResponseData}
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
          { name: "Faculty Work Load", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle pageTitle="Faculty Work Load" gobacklink="/timetable" />
            <Filters
              apiStatus={props.commonProps.apiStatus}
              toggleModalShow={props.commonProps.toggleModalShow}
              currentInstitute={props.commonProps.currentInstitute}
              refreshClassroomData={props.commonProps.refreshToggle}
              updateInputFilters={props.commonProps.updateInputFilters}
              resetClassroomForm={props.commonProps.resetClassroomForm}
              updateDepartmentFilter={props.commonProps.updateDepartmentFilter}
              filterHandlerByDepartment={
                props.commonProps.filterHandlerByDepartment
              }
            />
            {WORKLOAD_TABLE_COMPONENT}
            <BuildPagination
              totalpages={props.commonProps.workLoadApiResponseDataPage}
              activepage={props.commonProps.filterUpdate}
              getrequestedpage={props.commonProps.newPageRequest}
            />
            {WORKLOAD_MODAL_COMPONENT}
          </Container>
        </div>
      </div>
      <MobileFooter />
    </React.Fragment>
  );
};

export default Browser;
