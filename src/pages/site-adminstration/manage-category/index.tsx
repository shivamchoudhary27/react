import React from "react";
import Header from "../../header";
import Sidebar from "../../sidebar";
import { Container } from "react-bootstrap";
import CategoryTable from "./categoryTable";
import Addcategory from "./addcategory";

const ManageCategory = () => {
  return (
    <>
      <Header pageHeading="" welcomeIcon={false} />
      <Sidebar />
      <Container fluid>
        <div className="contents" style={{paddingLeft: '270px', marginTop: '70px'}}>
          <div className="container-wrapper">
            <div className="site-heading">
              <h3>Manage Categories: <strong>Master of Computer Applications</strong></h3>
            </div>
          </div>
          <hr />
          <CategoryTable />
          <Addcategory />
        </div>
      </Container>
    </>
  );
};

export default ManageCategory;
