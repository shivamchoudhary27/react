import View from "./view";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { pagination } from "../../../utils/pagination";
import { getData } from "../../../adapters/coreservices";

const UserManagement = () => {
  const dummyData = { items: [], pager: { totalElements: 0, totalPages: 0 } };
  const [visibleDownloadOption, setVisibleDownloadOption] = useState(false);
  const [userData, setUserData] = useState<any>(dummyData);
  const [uploadModalShow, setUploadModalShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [userObj, setUserObj] = useState({
    id: 0,
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userCountry: "",
    enabled: false,
  });
  const [refreshData, setRefreshData] = useState(true);
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
  const [apiStatus, setApiStatus] = useState("");
  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );
  const userAuthorities = useSelector(
    (state: any) => state.userAuthorities.permissions
  );

  // get programs API call === >>>
  useEffect(() => {
    if (refreshOnDelete === true && currentInstitute > 0) {
      getData(`/${currentInstitute}/users`, filterUpdate)
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            if (result.data.items.length < 1) {
            }
            setUserData(result.data);
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [refreshOnDelete]);

  // get programs API call === >>>
  useEffect(() => {
    if (currentInstitute > 0) setApiStatus("started");
    getData(`/${currentInstitute}/users`, filterUpdate)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          if (result.data.items.length < 1) {
          }
          setUserData(result.data);
        }
        setApiStatus("finished");
      })
      .catch((err: any) => {
        console.log(err);
        setApiStatus("finished");
      });
  }, [refreshData, filterUpdate, currentInstitute]);

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  const refreshOnDeleteToggle = (value: boolean) => {
    setRefreshOnDelete(value);
  };

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  const updateSearchFilters = (newFilterRequest: any, reset = false) => {
    if (reset === true) {
      let updatedState = { ...filterUpdate, pageNumber: 0 };
      if (updatedState.name !== undefined) delete updatedState.name;
      if (updatedState.email !== undefined) delete updatedState.email;
      if (updatedState.roleId !== undefined) delete updatedState.roleId;
      setFilterUpdate(updatedState);
    } else {
      const { name, email, roleId } = newFilterRequest;
      let updatedState = {
        ...filterUpdate,
        pageNumber: 0,
        ...newFilterRequest,
      };

      if (email === "") delete updatedState.email;
      if (name === "") delete updatedState.name;
      if (roleId === "") delete updatedState.roleId;

      setFilterUpdate(updatedState);
    }
  };

  const toggleUploadModal = () => {
    setUploadModalShow(true);
    setVisibleDownloadOption(false)
  };

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  // get id, name from the department table === >>>
  const editHandlerById = ({
    id,
    userFirstName,
    userLastName,
    userEmail,
    userCountry,
    enabled,
  }: any) => {
    setUserObj({
      id: id,
      userFirstName: userFirstName,
      userLastName: userLastName,
      userEmail: userEmail,
      userCountry: userCountry,
      enabled: enabled,
    });
  };

  // handle to open Add Discipline modal === >>>
  const openAddUserModal = () => {
    toggleModalShow(true);
    setUserObj({
      id: 0,
      userFirstName: "",
      userLastName: "",
      userEmail: "",
      userCountry: "",
      enabled: false,
    });
    // setRefreshData(false);
  };

  return (
    <React.Fragment>
      <View
        userObj={userObj}
        userData={userData}
        apiStatus={apiStatus}
        modalShow={modalShow}
        filterUpdate={filterUpdate}
        uploadModalShow={uploadModalShow}
        userAuthorities={userAuthorities}
        currentInstitute={currentInstitute}
        refreshToggle={refreshToggle}
        newPageRequest={newPageRequest}
        toggleModalShow={toggleModalShow}
        editHandlerById={editHandlerById}
        openAddUserModal={openAddUserModal}
        toggleUploadModal={toggleUploadModal}
        setUploadModalShow={setUploadModalShow}
        updateSearchFilters={updateSearchFilters}
        refreshOnDeleteToggle={refreshOnDeleteToggle}
        visibleDownloadOption={visibleDownloadOption}
        setVisibleDownloadOption={setVisibleDownloadOption}
      />
    </React.Fragment>
  );
};

export default UserManagement;
