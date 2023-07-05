import React, { useState, useEffect } from "react";
import Header from "../../../newHeader";
import Footer from "../../../newFooter";
import HeaderTabs from "../../../headerTabs";
import BreadcrumbComponent from "../../../../widgets/breadcrumb";
import PageTitle from "../../../../widgets/pageTitle";
import { Container } from "react-bootstrap";
import Filter from "./filter";
import RolesTable from "./table";
import AssignInstituteModal from "./form";
import { pagination } from "../../../../utils/pagination";
import { useSelector } from "react-redux";
import { getData } from "../../../../adapters/coreservices";
import AddRole from "./addRole";
import { useDispatch } from "react-redux";
import ACTIONSLIST from "../../../../store/actions";

const ManageRoles = () => {
  const dispatch = useDispatch();
  const dummyData = { items: [], pager: { totalElements: 0, totalPages: 0 } };
  const [userData, setUserData] = useState<any>(dummyData);
  const [modalShow, setModalShow] = useState(false);
  const [addRoleModalShow, setAddRoleModalShow] = useState(false);
  const [userObj, setUserObj] = useState({
    id: 0,
    name: "",
    description: "",
    published: false,
  });
  const [refreshData, setRefreshData] = useState(true);
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE * 10,
  });
  const [apiStatus, setApiStatus] = useState("");
  const currentInstitute = useSelector((state: any) => state.currentInstitute);

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
  const editHandlerById = ({ id, name, description, published }: any) => {
    setUserObj({
      id: id,
      name: name,
      description: description,
      published: published,
    });
  };

  // handle to open Add Role modal === >>>
  const openAddRoleModal = () => {
    setAddRoleModalShow(true);
    setUserObj({
      id: 0,
      name: "",
      description: "",
      published: false,
    });
    // setRefreshData(false);
  }; 

  return (
    <React.Fragment>
      <Header />
      <HeaderTabs />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "User Management", path: "/usermanagement" },
          { name: "Manage Roles", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle="Manage Roles" gobacklink="/usermanagement" />
          <Filter
            toggleModalShow={toggleModalShow}
            openAddRoleModal={openAddRoleModal}
            updateSearchFilters={updateSearchFilters}
            currentInstitute={currentInstitute}
          />
          <RolesTable
           userData={userData.items}
           currentInstitute={currentInstitute}
           refreshOnDeleteToggle={refreshOnDeleteToggle}
           apiStatus={apiStatus}
           editHandlerById={editHandlerById}
           setAddRoleModalShow={setAddRoleModalShow}
          />
        </Container>
      </div>
      <AssignInstituteModal
        show={modalShow}
        onHide={() => toggleModalShow(false)}
        togglemodalshow={toggleModalShow}
        updateAddRefresh={refreshToggle}
        currentInstitute={currentInstitute}
      />
      <AddRole
        show={addRoleModalShow}
        onHide={() => setAddRoleModalShow(false)}
        userobj={userObj}
        setaddrolemodalshow={setAddRoleModalShow}
        updateAddRefresh={refreshToggle}
        currentInstitute={currentInstitute}
      />
      <Footer />
    </React.Fragment>
  );
};

export default ManageRoles;
