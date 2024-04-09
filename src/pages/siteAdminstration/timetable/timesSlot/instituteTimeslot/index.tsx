import View from "./view";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { pagination } from "../../../../../utils/pagination";
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
    sortBy: "",
    sortOrder: "",
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });

  useEffect(() => {
    if (currentInstitute > 0) {
      let endPoint = `/${currentInstitute}/timetable/timeslot`;
      makeGetDataRequest(
        endPoint,
        filterUpdate,
        setInstituteTimeSlot,
        setApiStatus
      );
    }
  }, [refreshData, filterUpdate, currentInstitute]);

  // API call on delete === >>>
  useEffect(() => {
    if (currentInstitute > 0) {
      let endPoint = `/${currentInstitute}/timetable/timeslot`;
      makeGetDataRequest(
        endPoint,
        filterUpdate,
        setInstituteTimeSlot,
        setApiStatus
      );
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
    <View
      modalShow={modalShow}
      apiStatus={apiStatus}
      currentInstitute={currentInstitute}
      instituteTimeSlot={instituteTimeSlot.items}
      instituteTimeslotObj={instituteTimeslotObj}
      refreshToggle={refreshToggle}
      filterUpdate={filterUpdate}
      setFilterUpdate={setFilterUpdate}
      editHandlerById={editHandlerById}
      toggleModalShow={toggleModalShow}
      openInstituteModal={openInstituteModal}
      refreshOnDeleteToggle={refreshOnDeleteToggle}
    />
  );
};

export default InstituteTimeSlot;
