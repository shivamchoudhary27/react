import React, { useState } from "react";
import Header from "../../../newHeader";
import Footer from "../../../newFooter";
import HeaderTabs from "../../../headerTabs";
import BreadcrumbComponent from "../../../../widgets/breadcrumb";
import PageTitle from "../../../../widgets/pageTitle";
import { Container } from "react-bootstrap";
import Filter from "./filter";
import RolesTable from "./table";
import AssignInstituteModal from "./form";

const ManageRoles = () => {
  const [modalShow, setModalShow] = useState(false);

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
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
      <div className="contentarea-wrapper mt-3">
        <Container fluid>
          <PageTitle pageTitle="Manage Roles" gobacklink="/usermanagement" />
          <Filter toggleModalShow={toggleModalShow} />
          <RolesTable />
        </Container>
      </div>
      <AssignInstituteModal
        show={modalShow}
        onHide={() => toggleModalShow(false)}
      />
      <Footer />
    </React.Fragment>
  );
};

export default ManageRoles;
