import GuestFilter from "./filter";
import GuestUsersTable from "./table";
import Header from "../../../newHeader";
import Footer from "../../../newFooter";
import UpdateUserModal from "./modalForm";
import { Container } from "react-bootstrap";
import HeaderTabs from "../../../headerTabs";
import React, { useState, useEffect } from "react";
import PageTitle from "../../../../widgets/pageTitle";
import { pagination } from "../../../../utils/pagination";
import { getData } from "../../../../adapters/coreservices";
import BuildPagination from "../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../widgets/breadcrumb";
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
      id: 0,
      userFirstName: "",
      userLastName: "",
      userEmail: "",
      userCountry: "",
      enabled: false,
    });

    // get institute list API call === >>>
  useEffect(() => {
    setApiStatus("started");
    getInstitute("/institutes", filterUpdate)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          setInstuituteList(result.data);
        }
        setApiStatus("finished");
      })
      .catch((err: any) => {
        console.log(err);
        setApiStatus("finished");
      });
  }, [filterUpdate]);

  // get guest users API call === >>>
  useEffect(() => {
    setApiStatus("started");
    getData("/user/all_users", filterUpdate)
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
        setFilterUpdate(updatedState);
      } else {
        const { name, email } = newFilterRequest;
        let updatedState = {
          ...filterUpdate,
          pageNumber: 0,
          ...newFilterRequest,
        };

        if (email === "") delete updatedState.email;
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
    userFirstName,
    userLastName,
    userEmail,
    userCountry,
    enabled,
  }: any) => {
    setGuestUserObj({
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
    setGuestUserObj({
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
      <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "User Management", path: "/usermanagement" },
          { name: "Guest Users", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle="Guest User" gobacklink="/usermanagement" />
          <GuestFilter updatefilters={updateSearchFilters} />
          <GuestUsersTable
            apiStatus={apiStatus}
            guestUsersData={guestUsersData.items}
            editHandlerById={editHandlerById}
            toggleModalShow={toggleModalShow}
            refreshdata={refreshOnDeleteToggle}
            // userPermissions={userAuthorities}
          />
          <BuildPagination
            totalpages={guestUsersData.pager.totalPages}
            activepage={filterUpdate.pageNumber}
            getrequestedpage={newPageRequest}
          />
        </Container>
      </div>
      {/* <UploadNewUsers
        show={uploadModalShow}
        onHide={() => setUploadModalShow(false)}
        setUploadModalShow={setUploadModalShow}
        updateAddRefresh={refreshToggle}
        currentInstitute={currentInstitute}
      /> */}
      <UpdateUserModal
        show={modalShow}
        guestUserObj={guestUserObj}
        instituteList={instituteList.items}
        updateAddRefresh={refreshToggle}
        togglemodalshow={toggleModalShow}
        onHide={() => toggleModalShow(false)}
        // currentInstitute={currentInstitute}
      />
      <Footer />
    </React.Fragment>
  );
};

export default GuestUsers;
