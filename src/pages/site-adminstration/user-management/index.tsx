import React from "react";
import Header from "../../header";
import Sidebar from "../../sidebar";
import { Container } from "react-bootstrap";
import Filter from "./filter";
import UserManagementTable from "./table";

const UserManagement = () => {
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
            <Filter />
            <hr />
            <UserManagementTable />
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserManagement;
