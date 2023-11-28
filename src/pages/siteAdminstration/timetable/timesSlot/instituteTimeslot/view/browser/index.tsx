import React from "react";
import InstituteTimeSlotModal from "../../form";
import Header from "../../../../../../newHeader";
import Footer from "../../../../../../newFooter";
import { Container, Button } from "react-bootstrap";
import HeaderTabs from "../../../../../../headerTabs";
import ManageInstituteTimesSlotTable from "../../table";
import PageTitle from "../../../../../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../../../../../widgets/breadcrumb";

type Props = {
  commonProps: {
    modalShow: any;
    apiStatus: any;
    refreshToggle: any;
    editHandlerById: any;
    toggleModalShow: any;
    currentInstitute: any;
    instituteTimeSlot: any;
    openInstituteModal: any;
    instituteTimeslotObj: any;
    refreshOnDeleteToggle: any;
  };
};

const Browser = (props: Props) => {
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Timetable Management", path: "/timetable" },
          { name: "Manage Times Slot", path: "/timeslot" },
          { name: "Institute Times Slot", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle="Institute Times Slot" gobacklink="/timeslot" />
          <div className="filter-wrapper mt-2">
            <div className="site-button-group">
              <Button
                variant="primary"
                onClick={props.commonProps.openInstituteModal}
              >
                Add Slot
              </Button>{" "}
            </div>
          </div>
          <ManageInstituteTimesSlotTable
            apiStatus={props.commonProps.apiStatus}
            currentInstitute={props.commonProps.currentInstitute}
            instituteTimeSlot={props.commonProps.instituteTimeSlot}
            editHandlerById={props.commonProps.editHandlerById}
            toggleModalShow={props.commonProps.toggleModalShow}
            refreshTimeslotData={props.commonProps.refreshToggle}
            refreshOnDelete={props.commonProps.refreshOnDeleteToggle}
          />
        </Container>
      </div>
      <InstituteTimeSlotModal
        show={props.commonProps.modalShow}
        // departmentId={departmentId}
        currentInstitute={props.commonProps.currentInstitute}
        instituteTimeslotObj={props.commonProps.instituteTimeslotObj}
        togglemodalshow={props.commonProps.toggleModalShow}
        refreshClassroomData={props.commonProps.refreshToggle}
        // resetFormData={resetClassroomForm}
        onHide={() => props.commonProps.toggleModalShow(false)}
      />
      <Footer />
    </React.Fragment>
  );
};

export default Browser;
