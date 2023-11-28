import React from "react";
import Filters from "../../../filters";
import TimeSlotModal from "../../form";
import { Container } from "react-bootstrap";
import ManageTimesSlotTable from "../../table";
import Header from "../../../../../../newHeader";
import Footer from "../../../../../../newFooter";
import HeaderTabs from "../../../../../../headerTabs";
import PageTitle from "../../../../../../../widgets/pageTitle";
import BuildPagination from "../../../../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../../../../widgets/breadcrumb";

type Props = {
  commonProps: {
    modalShow: any;
    apiStatus: any;
    nameParams: any;
    timeslotObj: any;
    departmentId: any;
    timeslotList: any;
    filterUpdate: any;
    refreshToggle: any;
    departmentList: any;
    newPageRequest: any;
    editHandlerById: any;
    toggleModalShow: any;
    timeslotListPage: any;
    currentInstitute: any;
    updateInputFilters: any;
    resetClassroomForm: any;
    refreshOnDeleteToggle: any;
    getInstituteSlotAction: any;
    filterHandlerByDepartment: any;
    updateClassroomFilterByDepartment: any;
  };
};

const Browser = (props: Props) => {
  const TIMESLOT_TABLE_COMPONENT = (
    <ManageTimesSlotTable
      apiStatus={props.commonProps.apiStatus}
      timeslotList={props.commonProps.timeslotList}
      departmentList={props.commonProps.departmentList}
      editHandlerById={props.commonProps.editHandlerById}
      toggleModalShow={props.commonProps.toggleModalShow}
      currentInstitute={props.commonProps.currentInstitute}
      refreshTimeslotData={props.commonProps.refreshToggle}
      refreshOnDelete={props.commonProps.refreshOnDeleteToggle}
      resetClassroomForm={props.commonProps.resetClassroomForm}
      getInstituteSlotAction={props.commonProps.getInstituteSlotAction}
    />
  );

  const TIMESLOT_MODAL_COMPONENT = (
    <TimeSlotModal
      show={props.commonProps.modalShow}
      timeslotObj={props.commonProps.timeslotObj}
      departmentId={props.commonProps.departmentId}
      togglemodalshow={props.commonProps.toggleModalShow}
      currentInstitute={props.commonProps.currentInstitute}
      refreshClassroomData={props.commonProps.refreshToggle}
      onHide={() => props.commonProps.toggleModalShow(false)}
      resetClassroomForm={props.commonProps.resetClassroomForm}
    />
  );
  // <<< ==== END COMPONENTS ==== >>>

  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Timetable Management", path: "/timetable" },
          { name: "Manage Times Slot", path: "/timeslot" },
          { name: "View Times Slot", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle
            pageTitle={`Times Slot: ${props.commonProps.nameParams}`}
            gobacklink="/timeslot"
          />
          <Filters
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
          {TIMESLOT_TABLE_COMPONENT}
          <BuildPagination
            totalpages={props.commonProps.timeslotListPage}
            activepage={props.commonProps.filterUpdate}
            getrequestedpage={props.commonProps.newPageRequest}
          />
          {TIMESLOT_MODAL_COMPONENT}
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Browser;
