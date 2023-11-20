import View from "./view";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import ACTIONSLIST from "../../../../store/actions";
import { pagination } from "../../../../utils/pagination";
import { getData } from "../../../../adapters/coreservices";
import { IUserData, IUserObj, ICurrentInstitute } from "./types/interface";

interface IProps {}

const ManageRoles: React.FunctionComponent<IProps> = (props: IProps) => {
  const dispatch = useDispatch();
  const dummyData: IUserData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const [userData, setUserData] = useState<IUserData>(dummyData);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [addRoleModalShow, setAddRoleModalShow] = useState<boolean>(false);
  const [userObj, setUserObj] = useState<IUserObj>({
    id: 0,
    name: "",
    description: "",
    contextType: "",
    published: false,
    idNumber: "",
    shortName: "",
  });
  const [refreshData, setRefreshData] = useState<boolean>(true);
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE * 10,
  });
  const [apiStatus, setApiStatus] = useState<string>("");
  const currentInstitute: number = useSelector(
    (state: ICurrentInstitute) => state.globalFilters.currentInstitute
  );
  const rolePermissions = useSelector(
    (state: any) => state.userAuthorities.permissions.role
  );

  // get programs API call === >>>
  useEffect(() => {
    if (refreshOnDelete === true && currentInstitute > 0) {
      getData(`/${currentInstitute}/roles`, filterUpdate)
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            if (result.data.items.length < 1) {
              dispatch({
                type: ACTIONSLIST.mitGlobalAlert,
                alertMsg: "No data available for this request",
                status: true,
              });
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
    getData(`/${currentInstitute}/roles`, filterUpdate)
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

  const refreshOnDeleteToggle = (value: boolean): void => {
    setRefreshOnDelete(value);
  };

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  const updateSearchFilters = (
    newFilterRequest: { name: string },
    reset: boolean = false
  ): void => {
    console.log(newFilterRequest);
    if (reset === true) {
      let updatedState = { ...filterUpdate, pageNumber: 0 };
      if (updatedState.name !== undefined) delete updatedState.name;

      setFilterUpdate(updatedState);
    } else {
      const { name } = newFilterRequest;
      let updatedState = {
        ...filterUpdate,
        pageNumber: 0,
        ...newFilterRequest,
      };
      if (name === "") delete updatedState.name;
      setFilterUpdate(updatedState);
    }
  };

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  // get id, name from the department table === >>>
  const editHandlerById = ({
    id,
    name,
    description,
    contextType,
    published,
    idNumber,
    shortName,
  }: IUserObj): void => {
    setUserObj({
      id: id,
      name: name,
      description: description,
      contextType: contextType,
      published: published,
      idNumber: idNumber,
      shortName: shortName,
    });
  };

  // handle to open Add Role modal === >>>
  const openAddRoleModal = () => {
    setAddRoleModalShow(true);
    setUserObj({
      id: 0,
      name: "",
      description: "",
      contextType: "",
      published: false,
      shortName: "",
    });
    // setRefreshData(false);
  };

  return (
    <React.Fragment>
      <View
        userObj={userObj}
        apiStatus={apiStatus}
        modalShow={modalShow}
        userData={userData.items}
        rolePermissions={rolePermissions}
        currentInstitute={currentInstitute}
        addRoleModalShow={addRoleModalShow}
        refreshToggle={refreshToggle}
        editHandlerById={editHandlerById}
        toggleModalShow={toggleModalShow}
        openAddRoleModal={openAddRoleModal}
        updateSearchFilters={updateSearchFilters}
        setAddRoleModalShow={setAddRoleModalShow}
        refreshOnDeleteToggle={refreshOnDeleteToggle}
      />
    </React.Fragment>
  );
};

export default ManageRoles;
