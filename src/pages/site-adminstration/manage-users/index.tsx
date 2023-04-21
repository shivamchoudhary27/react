import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Header from "../../header";
import Sidebar from "../../sidebar";
import { Container } from "react-bootstrap";
import UserFilter from "./userFilter";
import UsersTable from "./usersTable";
import { makeGetDataRequest } from "../../../features/api_calls/getdata";
import { pagination } from "../../../utils/pagination";
import BuildPagination from "../../../widgets/pagination";

const ManageUserEnrollment = () => {
  const { programid, programname } = useParams();
  const parsedProgramid = parseInt(programid);
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
  }, [filterUpdate]);

  useEffect(() => {
    if (refreshOnDelete === true) makeGetDataRequest(`program/${programid}/enrol-user`, filterUpdate, setEnrolUserData); 
  }, [refreshOnDelete]);

  const refreshOnDeleteToggle = (value: boolean) => {
    setRefreshOnDelete(value);
  };

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
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
      <Header pageHeading={`Program Enrollment: ${programname}`} welcomeIcon={false} />
      <div className='main-content-container'>
        <Sidebar />
        <div className="content-area content-area-slider" id="contentareaslider">
          <Container fluid className="administration-wrapper">
            <UserFilter updateinputfilters={updateSearchFilters} programname={programname}/>
            <UsersTable
              enrolleduserdata={enrolUserData.items} 
              programid={parsedProgramid} 
              refreshdata={refreshOnDeleteToggle}
            />
            <BuildPagination
              totalpages={enrolUserData.pager.totalPages}
              activepage={filterUpdate.pageNumber}
              getrequestedpage={newPageRequest}
            />
          </Container>
        </div>
      </div>      
    </React.Fragment>
  );
};

export default ManageUserEnrollment;
