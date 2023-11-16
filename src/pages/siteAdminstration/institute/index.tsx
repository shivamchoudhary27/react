import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
import { Container } from "react-bootstrap";
import Filter from "./filter";
import UserManagementTable from "./table";
import { getData } from "../../../adapters/microservices";
import { pagination } from "../../../utils/pagination";
import BuildPagination from "../../../widgets/pagination";
import UploadNewUsers from "./uploadUsers";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import PageTitle from "../../../widgets/pageTitle";
import AddUserModal from "./modalForm";
import ConfigModal from "./configModal";
import {
  TypeDummyData, 
  TypeUserObj, 
  TypeModalShow, 
  TypeUploadModalShow, 
  TypeFilteUpdate,
  TypeApiStatus
} from "./types/type";

const InstituteManagement = () => {
  const dummyData: TypeDummyData = { items: [], pager: { totalElements: 0, totalPages: 0 } };
  const [userData, setUserData] = useState<TypeDummyData>(dummyData);
  const [uploadModalShow, setUploadModalShow] = useState<TypeUploadModalShow>(false);
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
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Institute Management", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle="Institute Management" gobacklink="/siteadmin" />
          <Filter
            updatefilters={updateSearchFilters}
            toggleUploadModal={toggleUploadModal}
            openAddUserModal={openAddUserModal}
            permissions={permissions}
          />
          {permissions.canView &&
            <>
              <UserManagementTable
                userdata={userData.items}
                refreshdata={refreshOnDeleteToggle}
                editHandlerById={editHandlerById}
                editConfigHandler={editConfigHandler}
                toggleModalShow={toggleModalShow}
                configModalShow={configModalShow}
                apiStatus={apiStatus}
                permissions={permissions}
              />
              <BuildPagination
                totalpages={userData.pager.totalPages}
                activepage={filterUpdate.pageNumber}
                getrequestedpage={newPageRequest}
              />
            </>
          }
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
      <ConfigModal
        show={configModal}
        onHide={() => configModalShow(false)}
        userobj={userObj}
        configModalShow={configModalShow}
        updateAddRefresh={refreshToggle}
        editConfigHandler={editConfigHandler}
      />
      <Footer />
    </React.Fragment>
  );
};

export default InstituteManagement;
