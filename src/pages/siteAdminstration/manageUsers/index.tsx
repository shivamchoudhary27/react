import View from "./view";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { pagination } from "../../../utils/pagination";
import { makeGetDataRequest } from "../../../features/apiCalls/getdata";

const ManageProgramEnrollment = () => {
  const { programid, programname } = useParams();
  const parsedProgramid = parseInt(programid);
  const [modalShow, setModalShow] = useState(false);
  const [usersModalShow, setUsersModalShow] = useState(false);
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const dummyData = { items: [], pager: { totalElements: 0, totalPages: 0 } };
  const [enrolUserData, setEnrolUserData] = useState<any>(dummyData);
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
  const [usersDataObj, setUsersDataObj] = useState({
    id: 0,
    userEmail: "",
    roleNumber: "",
    roleId: "",
  });
  const [apiStatus, setApiStatus] = useState("");
  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );

  // get programs API call === >>>
  useEffect(() => {
    makeGetDataRequest(
      `program/${programid}/enrol-user`,
      filterUpdate,
      setEnrolUserData,
      setApiStatus
    );
  }, [refreshData, filterUpdate]);

  useEffect(() => {
    if (refreshOnDelete === true)
      makeGetDataRequest(
        `program/${programid}/enrol-user`,
        filterUpdate,
        setEnrolUserData,
        setApiStatus
      );
  }, [refreshOnDelete]);

  const refreshOnDeleteToggle = (value: boolean) => {
    setRefreshOnDelete(value);
  };

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  // handle modal hide & show functionality === >>>
  const AddUsersModalShow = (status: boolean) => {
    setUsersModalShow(status);
    setUsersDataObj({
      id: 0,
      userEmail: "",
      roleNumber: "",
      roleId: "",
    });
  };

  // get users data from the users table === >>>
  const editHandlerById = (
    id: number,
    userEmail: string,
    roleNumber: string,
    roleId: string
  ) => {
    setUsersDataObj({
      id: id,
      userEmail: userEmail,
      roleNumber: roleNumber,
      roleId: roleId,
    });
  };

  const updateSearchFilters = (newFilterRequest: any, reset = false) => {
    if (reset === true) {
      let updatedState = { ...filterUpdate, pageNumber: 0 };
      delete updatedState.name;
      delete updatedState.email;
      delete updatedState.roleNumber;
      setFilterUpdate(updatedState);
      return false;
    } else {
      const { name, email, roleNumber } = newFilterRequest;
      let updatedState = {
        ...filterUpdate,
        pageNumber: 0,
        ...newFilterRequest,
      };

      if (email === "") delete updatedState.email;
      if (roleNumber === "") delete updatedState.roleNumber;
      if (name === "") delete updatedState.name;

      setFilterUpdate(updatedState);
    }
  };

  return (
    <View
      apiStatus={apiStatus}
      programId={programid}
      modalShow={modalShow}
      programname={programname}
      programid={parsedProgramid}
      usersDataObj={usersDataObj}
      refreshToggle={refreshToggle}
      newPageRequest={newPageRequest}
      usersModalShow={usersModalShow}
      toggleModalShow={toggleModalShow}
      editHandlerById={editHandlerById}
      AddUsersModalShow={AddUsersModalShow}
      currentInstitute={currentInstitute}
      filterUpdate={filterUpdate.pageNumber}
      enrolleduserdata={enrolUserData.items}
      updateinputfilters={updateSearchFilters}
      totalpages={enrolUserData.pager.totalPages}
      refreshOnDeleteToggle={refreshOnDeleteToggle}
    />
  );
};
export default ManageProgramEnrollment;

