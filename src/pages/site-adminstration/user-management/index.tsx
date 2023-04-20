import React, { useEffect, useState } from "react";
import Header from "../../header";
import Sidebar from "../../sidebar";
import { Container } from "react-bootstrap";
import Filter from "./filter";
import UserManagementTable from "./table";
import { getData } from "../../../adapters/coreservices";
import { pagination } from "../../../utils/pagination";
import BuildPagination from "../../../widgets/pagination";

const UserManagement = () => {
  const dummyData = {items: {content : []}, pager: {totalElements: 0, totalPages: 0}}
  const [userData, setUserData] = useState<any>(dummyData);
  const [refreshOnDelete, setRefreshOnDelete] = useState<boolean>(true);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });

  // get programs API call === >>>
  useEffect(() => {
    if (refreshOnDelete === true) {
      getData("/user/all_users", filterUpdate)
          .then((result : any) => {
              if (result.data !== "" && result.status === 200) {
                  if (result.data.items.content.length < 1) {
                      window.alert('No data available for this request');
                  }
                  setUserData(result.data);
              }
          })
          .catch((err : any) => {
              console.log(err);
          });
    }
  }, [refreshOnDelete, filterUpdate]);

  const refreshOnDeleteToggle = (value: boolean) => {
    setRefreshOnDelete(value);
  };

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  const updateSearchFilters = (newFilterRequest: any, reset = false ) => {
    if (reset === true) {
      let updatedState = {...filterUpdate, pageNumber: 0};
      if (updatedState.firstName !== undefined) delete updatedState.firstName
      if (updatedState.lastName !== undefined) delete updatedState.lastName
      if (updatedState.email !== undefined) delete updatedState.email
      if (updatedState.city !== undefined) delete updatedState.city

      setFilterUpdate(updatedState);
    } else {
      const { firstName, email, city } = newFilterRequest;
      let updatedState = {...filterUpdate, pageNumber: 0, ...newFilterRequest};

      if (email === "") delete updatedState.email;
      if (firstName === "") delete updatedState.firstName;
      if (city === "") delete updatedState.city;

      setFilterUpdate(updatedState);
    }
  }

  return (
    <React.Fragment>
      <Header pageHeading="User Management" welcomeIcon={false} />
      <div className="main-content-container">
        <Sidebar />
        <div
          className="content-area content-area-slider"
          id="contentareaslider"
        >
          <Container fluid className="administration-wrapper">
            <Filter updatefilters={updateSearchFilters}/>
            <hr />
            <UserManagementTable userdata={userData.items.content} refreshdata={refreshOnDeleteToggle}/>
            <BuildPagination
              totalpages={userData.pager.totalPages}
              activepage={filterUpdate.pageNumber}
              getrequestedpage={newPageRequest}
            />
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserManagement;
