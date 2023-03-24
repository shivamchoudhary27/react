import React from "react";
import Header from "../../header";
import Sidebar from "../../sidebar";
import { Container } from "react-bootstrap";
import UserFilter from "./userFilter";
import UsersTable from "./usersTable";

const ManageUsers = () => {
  return (
    <>
      <Header pageHeading="Manage Users: Master of Computer Applications" welcomeIcon={false} />
      <div className='main-content-container'>
        <Sidebar />
        <div className="content-area content-area-slider" id="contentareaslider">
          <Container fluid className="administration-wrapper">
            <UserFilter />
            <UsersTable />
          </Container>
        </div>
      </div>      
    </>
  );
};

export default ManageUsers;
