import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
import { Container } from "react-bootstrap";
import UserFilter from "./userFilter";
import UsersTable from "./usersTable";
import UploadUsersEnrollment from "./uploadUsers";
import { makeGetDataRequest } from "../../../features/apiCalls/getdata";
import { pagination } from "../../../utils/pagination";
import BuildPagination from "../../../widgets/pagination";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import PageTitle from "../../../widgets/pageTitle";
import AddUsersModal from "./addUsersModal";

const ManageProgramEnrollment = () => {
  const { programid, programname } = useParams();
  const parsedProgramid = parseInt(programid);
  const [modalShow, setModalShow] = useState(false);
  const [usersModalShow, setUsersModalShow] = useState(false);
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const dummyData = { items: [], pager: { totalElements: 0, totalPages: 0 } };
  const [enrolUserData, setEnrolUserData] = useState<any>(dummyData);
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
  const [usersDataObj, setUsersDataObj] = useState({
    id: 0,
    email: "",
    roleNo: "",
    role: "",
  });
  const [apiStatus, setApiStatus] = useState("");
  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  ); 

  // get programs API call === >>>
  useEffect(() => {
    makeGetDataRequest(
      `program/${programid}/enrol-user`,
      filterUpdate,
      setEnrolUserData, setApiStatus
    );
  }, [refreshData, filterUpdate]);

  useEffect(() => {
    if (refreshOnDelete === true)
      makeGetDataRequest(
        `program/${programid}/enrol-user`,
        filterUpdate,
        setEnrolUserData, setApiStatus
      );
  }, [refreshOnDelete]);

  const refreshOnDeleteToggle = (value: boolean) => {
    setRefreshOnDelete(value);
  };

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  // handle modal hide & show functionality === >>>
  const AddUsersModalShow = (status: boolean) => {
    setUsersModalShow(status);
    setUsersDataObj({
      id: 0,
      email: "",
      roleNo: "",
      role: "",
    });
  };

  // get users data from the users table === >>>
  const editHandlerById = (
    id: number,
    email: string,
    roleNo: string,
    role: string
  ) => {
    setUsersDataObj({
      id: id,
      email: email,
      roleNo: roleNo,
      role: role,
    });
  };

  const updateSearchFilters = (newFilterRequest: any, reset = false) => {
    if (reset === true) {
      const { name, email, rolenumber, ...newObject } = newFilterRequest;
      setFilterUpdate({ ...filterUpdate, ...newObject });
    } else {
      const { name, email, roleNumber } = newFilterRequest;
      let updatedState = {
        ...filterUpdate,
        pageNumber: 0,
        ...newFilterRequest,
      };

      if (email === "") delete updatedState.email;
      if (roleNumber === "") delete updatedState.roleNumber;
      if (name === "") delete updatedState.name;

      setFilterUpdate(updatedState);
    }
  };

  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Program Enrollment", path: "/programenrollment" },
          { name: programname, path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle
            pageTitle={`Program: <span>${programname}</span>`}
            gobacklink="/programenrollment"
          />
          <UserFilter
            updateinputfilters={updateSearchFilters}
            programname={programname}
            toggleModalShow={toggleModalShow}
            AddUsersModalShow={AddUsersModalShow}
          />
            <UsersTable
              enrolleduserdata={enrolUserData.items}
              programid={parsedProgramid}
              refreshdata={refreshOnDeleteToggle}
              programname={programname}
              editHandlerById={editHandlerById}
              AddUsersModalShow={AddUsersModalShow}
              apiStatus={apiStatus}
            /> 
          
          <BuildPagination
            totalpages={enrolUserData.pager.totalPages}
            activepage={filterUpdate.pageNumber}
            getrequestedpage={newPageRequest}
          />
        </Container>
      </div>
      <UploadUsersEnrollment
        programid={programid}
        show={modalShow}
        onHide={() => toggleModalShow(false)}
        togglemodalshow={toggleModalShow}
        updateAddRefresh={refreshToggle}
      />
      <AddUsersModal
        show={usersModalShow}
        onHide={() => AddUsersModalShow(false)}
        addusersmodalshow={AddUsersModalShow}
        usersdataobj={usersDataObj}
        refreshToggle={refreshToggle}
        currentInstitute={currentInstitute}
      />
      <Footer />
    </React.Fragment>
  );
};

export default ManageProgramEnrollment;
