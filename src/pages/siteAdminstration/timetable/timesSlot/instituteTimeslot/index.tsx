import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import { useSelector } from "react-redux";
import InstituteTimeSlotModal from "./form";
import HeaderTabs from "../../../../headerTabs";
import React, { useState, useEffect } from "react";
import ManageInstituteTimesSlotTable from "./table";
import { Button, Container } from "react-bootstrap";
import PageTitle from "../../../../../widgets/pageTitle";
import { pagination } from "../../../../../utils/pagination";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";
import { makeGetDataRequest } from "../../../../../features/apiCalls/getdata";

type Props = {};

const InstituteTimeSlot = (props: Props) => {
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const [instituteTimeSlot, setInstituteTimeSlot] = useState(dummyData);
  const [refreshOnDelete, setRefreshOnDelete] = useState(false);
  const [refreshData, setRefreshData] = useState(true);
  const [instituteTimeslotObj, setInstituteTimeslotObj] = useState({
    id: 0,
    startTime: "",
    endTime: "",
    type: "lunch",
    breakTime: "",
  });
  const [modalShow, setModalShow] = useState(false);
  const [apiStatus, setApiStatus] = useState("");
  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );
  const [filterUpdate, setFilterUpdate] = useState({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });

  useEffect(() => {
    if (currentInstitute > 0) {
      let endPoint = `/${currentInstitute}/timetable/timeslot`;
      makeGetDataRequest(endPoint, filterUpdate, setInstituteTimeSlot, setApiStatus);
    }
  }, [refreshData, filterUpdate, currentInstitute]);

  // API call on delete === >>>
  useEffect(() => {
    if (currentInstitute > 0) {
      let endPoint = `/${currentInstitute}/timetable/timeslot`;
      makeGetDataRequest(endPoint, filterUpdate, setInstituteTimeSlot, setApiStatus);
    }
  }, [refreshOnDelete]);

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  const refreshOnDeleteToggle = (value: boolean) => {
    setRefreshOnDelete(value);
  };

  // get id, name from the department table === >>>
  const editHandlerById = ({
    id,
    startTime,
    endTime,
    type,
    breakTime,
  }: any) => {
    setInstituteTimeslotObj({
      id: id,
      startTime: startTime,
      endTime: endTime,
      type: type,
      breakTime: breakTime,
    });
  };

  const openInstituteModal = () => {
    toggleModalShow(true);
    resetClassroomForm();
  };

  // handle reset Form after SAVE data === >>>
  const resetClassroomForm = () => {
    setInstituteTimeslotObj({
      id: 0,
      startTime: "",
      endTime: "",
      type: "lunch",
      breakTime: "",
    });
  };

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

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
                onClick={openInstituteModal}
              >
                Add Slot
              </Button>{" "}
            </div>
          </div>
          <ManageInstituteTimesSlotTable
            apiStatus={apiStatus}
            currentInstitute={currentInstitute}
            instituteTimeSlot={instituteTimeSlot.items}
            editHandlerById={editHandlerById}
            toggleModalShow={toggleModalShow}
            refreshTimeslotData={refreshToggle}
            refreshOnDelete={refreshOnDeleteToggle}
          />
        </Container>
      </div>
      <InstituteTimeSlotModal 
        show={modalShow}
        // departmentId={departmentId}
        currentInstitute={currentInstitute}
        instituteTimeslotObj={instituteTimeslotObj}
        togglemodalshow={toggleModalShow}
        refreshClassroomData={refreshToggle}
        // resetFormData={resetClassroomForm}
        onHide={() => toggleModalShow(false)}
      />
      <Footer />
    </React.Fragment>
  );
};

export default InstituteTimeSlot;
