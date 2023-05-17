import React, { useEffect, useState } from "react";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
// import Sidebar from "../../sidebar";
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
  const [userObj, setUserObj] = useState({});
  const [refreshData, setRefreshData] = useState(true);
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(true);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });

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
  }, [refreshOnDelete, filterUpdate]);

  // get programs API call === >>>
  useEffect(() => {
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
  }, [refreshData]);

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
      if (updatedState.city !== undefined) delete updatedState.city;

      setFilterUpdate(updatedState);
    } else {
      const { firstName, email, city } = newFilterRequest;
      let updatedState = {
        ...filterUpdate,
        pageNumber: 0,
        ...newFilterRequest,
      };

      if (email === "") delete updatedState.email;
      if (firstName === "") delete updatedState.firstName;
      if (city === "") delete updatedState.city;

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
  const editHandlerById = ({ id, name }: any) => {
    setUserObj({ id: id, name: name });
  };

  // handle reset Form after SAVE data === >>>
  const resetUserForm = () => {
    setUserObj({ id: 0, name: "" });
    setRefreshData(false);
  };

  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="siteadmin"/>
      <BreadcrumbComponent
            routes={[
              { name: "Site Administration", path: "/siteadmin" },
              { name: "User Management", path: "" },
            ]}
          />
      <div className="contentarea-wrapper mt-3">
        <Container fluid>
          <PageTitle 
            pageTitle = "User Management" gobacklink = "/siteadmin"
          />
          <Filter
            updatefilters={updateSearchFilters}
            toggleUploadModal={toggleUploadModal}
            toggleModalShow={toggleModalShow}
          />
          <UserManagementTable
            userdata={userData.items}
            refreshdata={refreshOnDeleteToggle}
            editHandlerById={editHandlerById}
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
        userObj={userObj}
        // setUploadModalShow={setUploadModalShow}
        updateAddRefresh={refreshToggle}
      />
      <Footer />
    </React.Fragment>
  );
};

export default UserManagement;
