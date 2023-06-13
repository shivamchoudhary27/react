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
import InstituteFilter from "../institute/instituteGlobalFilter";

const UserManagement = () => {
  const dummyData = { items: [], pager: { totalElements: 0, totalPages: 0 } };
  const [userData, setUserData] = useState<any>(dummyData);
  const [uploadModalShow, setUploadModalShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [userObj, setUserObj] = useState({
    id : 0,
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userCountry: "",
  });
  const [refreshData, setRefreshData] = useState(true);
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
  const [apiStatus, setApiStatus] = useState("");
  const [currentInstitute, setCurrentInstitute] = useState<any>(0);
  const [currentInstitueName, setCurrentInstituteName] = useState<string>('');

  // get programs API call === >>>
  useEffect(() => {
    if (refreshOnDelete === true && currentInstitute > 0) {
      getData(`/${currentInstitute}/users`, filterUpdate)
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
    if (currentInstitute > 0)
    setApiStatus("started");
    getData(`/${currentInstitute}/users`, filterUpdate)
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
      if (updatedState.userFirstName !== undefined) delete updatedState.userFirstName;
      if (updatedState.userLastName !== undefined) delete updatedState.userLastName;
      if (updatedState.userEmail !== undefined) delete updatedState.userEmail;

      setFilterUpdate(updatedState);
    } else {
      const { userFirstName, userEmail } = newFilterRequest;
      let updatedState = {
        ...filterUpdate,
        pageNumber: 0,
        ...newFilterRequest,
      };

      if (userEmail === "") delete updatedState.userEmail;
      if (userFirstName === "") delete updatedState.userFirstName;

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
    userFirstName,
    userLastName,
    userEmail,
    userCountry,
  }: any) => {
    setUserObj({
      id: id,
      userFirstName: userFirstName,
      userLastName: userLastName,
      userEmail: userEmail,
      userCountry: userCountry,
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
    });
    // setRefreshData(false);
  };

  const updateCurrentInstitute = (instituteId : number) => {
    setCurrentInstitute(instituteId);
  }

  const updateInstituteName = (instituteName : string) => {
    setCurrentInstituteName(instituteName)
  }

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
          <div className="row gx-2 mb-3 align-items-center justify-content-center">
            <div className="col-auto">
              <label className="col-form-label">Institute : </label>
            </div>
            <div className="col-auto">
              <InstituteFilter updateCurrentInstitute={updateCurrentInstitute} updateInstituteName={updateInstituteName}/>
            </div>
          </div>
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
            currentInstitute={currentInstitute}
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
        currentInstitute={currentInstitute}
      />
      <AddUserModal
        show={modalShow}
        onHide={() => toggleModalShow(false)}
        userobj={userObj}
        togglemodalshow={toggleModalShow}
        updateAddRefresh={refreshToggle}
        currentInstitute={currentInstitute}
      />
      <Footer />
    </React.Fragment>
  );
};

export default UserManagement;
