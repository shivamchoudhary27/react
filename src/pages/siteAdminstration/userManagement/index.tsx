import React, { useEffect, useState } from "react";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
import { Container } from "react-bootstrap";
import Filter from "./filter";
import UserManagementTable from "./table";
import { getData } from "../../../adapters/coreservices";
import { pagination } from "../../../utils/pagination";
import BuildPagination from "../../../widgets/pagination";
import UploadNewUsers from "./uploadUsers";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import PageTitle from "../../../widgets/pageTitle";
import AddUserModal from "./modalForm";

const UserManagement = () => {
  const dummyData = { items: [], pager: { totalElements: 0, totalPages: 0 } };
  const [userData, setUserData] = useState<any>(dummyData);
  const [uploadModalShow, setUploadModalShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [userObj, setUserObj] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
    country: "",
  });
  const [refreshData, setRefreshData] = useState(true);
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
  const [apiStatus, setApiStatus] = useState("");

  // get programs API call === >>>
  useEffect(() => {
    if (refreshOnDelete === true) {
      getData("/user/all_users", filterUpdate)
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            if (result.data.items.length < 1) {
              window.alert("No data available for this request");
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
    getData("/user/all_users", filterUpdate)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          if (result.data.items.length < 1) {
            // window.alert("No data available for this request");
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

  console.log(apiStatus);

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
      if (updatedState.lastName !== undefined) delete updatedState.lastName;
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

  const toggleUploadModal = () => {
    setUploadModalShow(true);
  };

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  // get id, name from the department table === >>>
  const editHandlerById = ({
    id,
    username,
    password,
    firstname,
    lastname,
    email,
    country,
  }: any) => {
    setUserObj({
      id: id,
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      email: email,
      country: country,
    });
  };

  // handle to open Add Discipline modal === >>>
  const openAddUserModal = () => {
    toggleModalShow(true);
    setUserObj({
      id: 0,
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      country: "",
    });
    // setRefreshData(false);
  };

  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "User Management", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3">
        <Container fluid>
          <PageTitle pageTitle="User Management" gobacklink="/siteadmin" />
          <Filter
            updatefilters={updateSearchFilters}
            toggleUploadModal={toggleUploadModal}
            openAddUserModal={openAddUserModal}
          />
          <UserManagementTable
            userdata={userData.items}
            refreshdata={refreshOnDeleteToggle}
            editHandlerById={editHandlerById}
            toggleModalShow={toggleModalShow}
            apiStatus={apiStatus}
          />
          <BuildPagination
            totalpages={userData.pager.totalPages}
            activepage={filterUpdate.pageNumber}
            getrequestedpage={newPageRequest}
          />
        </Container>
      </div>
      <UploadNewUsers
        show={uploadModalShow}
        onHide={() => setUploadModalShow(false)}
        setUploadModalShow={setUploadModalShow}
        updateAddRefresh={refreshToggle}
      />
      <AddUserModal
        show={modalShow}
        onHide={() => toggleModalShow(false)}
        userobj={userObj}
        togglemodalshow={toggleModalShow}
        updateAddRefresh={refreshToggle}
      />
      <Footer />
    </React.Fragment>
  );
};

export default UserManagement;
