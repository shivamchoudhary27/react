import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
// import Sidebar from "../../sidebar";
import { Container } from "react-bootstrap";
import UserFilter from "./userFilter";
import UsersTable from "./usersTable";
import UploadUsersEnrollment from "./uploadUsers";
import { makeGetDataRequest } from "../../../features/api_calls/getdata";
import { pagination } from "../../../utils/pagination";
import BuildPagination from "../../../widgets/pagination";

const ManageProgramEnrollment = () => {
  const { programid, programname } = useParams();
  const parsedProgramid = parseInt(programid);
  const [modalShow, setModalShow] = useState(false);
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const dummyData = {items: [], pager: {totalElements: 0, totalPages: 0}}
  const [enrolUserData, setEnrolUserData] = useState<any>(dummyData);
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(false);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
  
  // get programs API call === >>>
  useEffect(() => {
    makeGetDataRequest(`program/${programid}/enrol-user`, filterUpdate, setEnrolUserData); 
  }, [refreshData, filterUpdate]);

  useEffect(() => {
    if (refreshOnDelete === true) makeGetDataRequest(`program/${programid}/enrol-user`, filterUpdate, setEnrolUserData); 
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

  const updateSearchFilters = (newFilterRequest: any, reset = false ) => {
    if (reset === true) {
      const { name, email, rolenumber, ...newObject } = newFilterRequest;
      setFilterUpdate({...filterUpdate, ...newObject});
    } else {
      const { name, email, roleNumber} = newFilterRequest;
      let updatedState = {...filterUpdate, pageNumber: 0, ...newFilterRequest};

      if (email === "") delete updatedState.email;
      if (roleNumber === "") delete updatedState.roleNumber;
      if (name === "") delete updatedState.name;

      setFilterUpdate(updatedState);
    }
  }

  return (
    <React.Fragment>
      <Header />
      <HeaderTabs />
      <div className="contentarea-wrapper mt-3">
          <Container fluid className="administration-box">
            <UserFilter 
              updateinputfilters={updateSearchFilters} 
              programname={programname} 
              toggleModalShow={toggleModalShow}
            />
            <UsersTable
              enrolleduserdata={enrolUserData.items} 
              programid={parsedProgramid} 
              refreshdata={refreshOnDeleteToggle}
              programname={programname}
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
      <Footer /> 
    </React.Fragment>
  );
};

export default ManageProgramEnrollment;
