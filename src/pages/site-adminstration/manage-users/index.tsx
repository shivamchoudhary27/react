import React from "react";
import Header from "../../header";
import Sidebar from "../../sidebar";
import { Container } from "react-bootstrap";
import UserFilter from "./userFilter";
import UsersTable from "./usersTable";

const ManageUsers = () => {
  return (
    <>
      <Header pageHeading="" welcomeIcon={false} />
      <Sidebar />
      <Container fluid>
        <div className="contents" style={{paddingLeft: '290px', paddingRight: '2%'}}>
          <div className="container-wrapper">
            <div className="site-heading">
              <h3>
                Manage Users: <strong>Master of Computer Applications</strong>
              </h3>
            </div>
          </div>
          <hr />
          <UserFilter />
          <UsersTable />
        </div>
      </Container>
    </>
  );
};

export default ManageUsers;
