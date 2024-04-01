import View from "./view";
import { useState, useEffect } from "react";
import { pagination } from "../../../../utils/pagination";
import { getData } from "../../../../adapters/coreservices";
import { getData as getInstitute } from "../../../../adapters/microservices";

type Props = {};

const GuestUsers = (props: Props) => {
  const dummyData = { items: [], pager: { totalElements: 0, totalPages: 0 } };
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [guestUsersData, setGuestUsersData] = useState(dummyData);
  const [instituteList, setInstuituteList] = useState(dummyData);
  const [refreshData, setRefreshData] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [apiStatus, setApiStatus] = useState("");
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
  const [guestUserObj, setGuestUserObj] = useState({
    // id: 0,
    // userFirstName: "",
    // userLastName: "",
    // userEmail: "",
    // userCountry: "",
    // enabled: false,

    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    instituteIds: []
  });

  // get institute list API call === >>>
  useEffect(() => {
    getInstitute("/institutes", filterUpdate)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          let instituteData = result.data.items.filter(
            (Obj: any) => Obj.locked !== false
          );
          result.data.items = instituteData;
          setInstuituteList(result.data);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  // get guest users API call === >>>
  useEffect(() => {
    setApiStatus("started");
    getData("/guest-users", filterUpdate)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          setGuestUsersData(result.data);
        }
        setApiStatus("finished");
      })
      .catch((err: any) => {
        console.log(err);
        setApiStatus("finished");
      });
  }, [refreshData, filterUpdate]);

  // refresh on delete === >>>
  useEffect(() => {
    getData("/guest-users", filterUpdate)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          setGuestUsersData(result.data);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [refreshOnDelete]);

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
      if (updatedState.firstName !== undefined) delete updatedState.firstName;
      if (updatedState.email !== undefined) delete updatedState.email;
      setFilterUpdate(updatedState);
    } else {
      const { firstName, email } = newFilterRequest;
      let updatedState = {
        ...filterUpdate,
        pageNumber: 0,
        ...newFilterRequest,
      };

      if (email === "") delete updatedState.email;
      if (firstName === "") delete updatedState.firstName;

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
    firstName,
    lastName,
    email,
    country,
    instituteIds,
  }: any) => {
    setGuestUserObj({
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      country: country,
      instituteIds: instituteIds,
    });
  };

  // handle to open Add Discipline modal === >>>
  const openAddUserModal = () => {
    toggleModalShow(true);
    setGuestUserObj({
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      instituteIds: []
    });
    // setRefreshData(false);
  };

  return (
    // <React.Fragment>
       <View
        apiStatus={apiStatus}
        modalShow={modalShow}
        filterUpdate={filterUpdate}
        guestUserObj={guestUserObj}
        refreshToggle={refreshToggle}
        newPageRequest={newPageRequest}
        editHandlerById={editHandlerById}
        toggleModalShow={toggleModalShow}
        instituteList={instituteList.items}
        activepage={filterUpdate.pageNumber}
        onHide={() => toggleModalShow(false)}
        guestUsersData={guestUsersData.items}
        updateSearchFilters={updateSearchFilters}
        totalPages={guestUsersData.pager.totalPages}
        refreshOnDeleteToggle={refreshOnDeleteToggle}
        setGuestUserObj={setGuestUserObj}
      /> 
      );
    };
    
    export default GuestUsers;