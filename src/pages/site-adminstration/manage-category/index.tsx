import React from "react";
import Header from "../../header";
import Sidebar from "../../sidebar";
import { Container, Button } from "react-bootstrap";
import CategoryTable from "./categoryTable";
import Addcategory from "./addcategory";
import { useNavigate } from "react-router-dom";

const ManageCategory = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header pageHeading="" welcomeIcon={false} />
      <div className='main-content-container'>
        <Sidebar />
        <div className="content-area content-area-slider" id="contentareaslider">
        <Container fluid className="administration-wrapper">
          <div className="site-heading">
            <h3>Manage Categories: <strong>Master of Computer Applications</strong></h3>
          </div>
          <Button
            variant="outline-secondary"
            onClick={() => navigate("/manageprogram")}
          >
            Go back
          </Button>
          <hr />
          <CategoryTable />
          <Addcategory />
        </Container>
        </div>        
      </div>      
    </>
  );
};

export default ManageCategory;
