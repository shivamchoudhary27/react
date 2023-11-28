import View from "./view";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { pagination } from "../../../utils/pagination";
import { getData } from "../../../adapters/microservices";
import {
  TypeDummyData,
  TypeUserObj,
  TypeModalShow,
  TypeUploadModalShow,
  TypeFilteUpdate,
  TypeApiStatus,
} from "./types/type";

const InstituteManagement = () => {
  const dummyData: TypeDummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const [userData, setUserData] = useState<TypeDummyData>(dummyData);
  const [uploadModalShow, setUploadModalShow] =
    useState<TypeUploadModalShow>(false);
  const [modalShow, setModalShow] = useState<TypeModalShow>(false);
  const [configModal, setConfigModal] = useState(false);
  const [userObj, setUserObj] = useState<TypeUserObj>({
    id: 0,
    name: "",
    userEmail: "",
    shortCode: "",
    instanceUrl: "",
    webServiceToken: "",
    locked: "",
  });
  const [refreshData, setRefreshData] = useState(true);
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
  const [apiStatus, setApiStatus] = useState<TypeApiStatus>("");
  const permissions = useSelector(
    (state: any) => state.userAuthorities.permissions.institute
  );

  // get programs API call === >>>
  useEffect(() => {
    if (refreshOnDelete === true) {
      getData("/institutes", filterUpdate)
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
    setApiStatus("started");
    getData("/institutes", filterUpdate)
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
  }, [refreshData, filterUpdate]);

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
      if (updatedState.shortCode !== undefined) delete updatedState.shortCode;

      setFilterUpdate(updatedState);
    } else {
      const { shortCode, name } = newFilterRequest;
      let updatedState = {
        ...filterUpdate,
        pageNumber: 0,
        ...newFilterRequest,
      };

      if (shortCode === "") delete updatedState.shortCode;
      if (name === "") delete updatedState.name;

      setFilterUpdate(updatedState);
    }
  };

  const toggleUploadModal = () => {
    setUploadModalShow(true);
  };

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  // handle modal hide & show functionality === >>>
  const configModalShow = (status: boolean) => {
    setConfigModal(status);
  };

  // get configure handler === >>>
  const editConfigHandler = ({
    id,
    name,
    userEmail,
    shortCode,
    instanceUrl,
    webServiceToken,
    locked,
  }: any) => {
    setUserObj({
      id: id,
      name: name,
      userEmail: userEmail,
      shortCode: shortCode,
      instanceUrl: instanceUrl,
      webServiceToken: webServiceToken,
      locked: locked,
    });
  };

  // get id, name from the department table === >>>
  const editHandlerById = ({
    id,
    name,
    userEmail,
    shortCode,
    instanceUrl,
    webServiceToken,
    locked,
  }: any) => {
    setUserObj({
      id: id,
      name: name,
      userEmail: userEmail,
      shortCode: shortCode,
      instanceUrl: instanceUrl,
      webServiceToken: webServiceToken,
      locked: locked,
    });
  };

  // handle to open Add Discipline modal === >>>
  const openAddUserModal = () => {
    toggleModalShow(true);
    setUserObj({
      id: 0,
      name: "",
      userEmail: "",
      shortCode: "",
      instanceUrl: "",
      webServiceToken: "",
      locked: "",
    });
    // setRefreshData(false);
  };

  return (
    <View
      userObj={userObj}
      apiStatus={apiStatus}
      modalShow={modalShow}
      permissions={permissions}
      configModal={configModal}
      userData={userData.items}
      uploadModalShow={uploadModalShow}
      permissionsView={permissions.canView}
      filterUpdate={filterUpdate.pageNumber}
      userDataPage={userData.pager.totalPages}
      refreshToggle={refreshToggle}
      newPageRequest={newPageRequest}
      editHandlerById={editHandlerById}
      toggleModalShow={toggleModalShow}
      configModalShow={configModalShow}
      openAddUserModal={openAddUserModal}
      editConfigHandler={editConfigHandler}
      toggleUploadModal={toggleUploadModal}
      setUploadModalShow={setUploadModalShow}
      updateSearchFilters={updateSearchFilters}
      refreshOnDeleteToggle={refreshOnDeleteToggle}
    />
  );
};

export default InstituteManagement;
