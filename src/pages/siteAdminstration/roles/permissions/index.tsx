import React from "react";
import Header from "../../../newHeader";
import Footer from "../../../newFooter";
import HeaderTabs from "../../../headerTabs";
import BreadcrumbComponent from "../../../../widgets/breadcrumb";
import PageTitle from "../../../../widgets/pageTitle";
import { Container } from "react-bootstrap";
import Filter from "./filter";
import UserManagement from "./userManagement";
import ProgramManagement from "./programManagement";
import ProgramEnrolment from "./programEnrolment";
import CustomButton from "../../../../widgets/formInputFields/buttons";

const Permission = () => {
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "User Management", path: "/usermanagement" },
          { name: "Manage Roles", path: "/manageroles" },
          { name: "Set Permission", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3">
        <Container fluid>
          <PageTitle
            pageTitle="Permission : Role Name"
            gobacklink="/manageroles"
          />
          <Filter />
          <UserManagement />
          <ProgramManagement />
          <ProgramEnrolment />
          <div style={{textAlign:"center"}}>
            <CustomButton
              btnText="Save Permissions"
              type="submit"
              variant="primary"
              disabled=""
            />{" "}
            <CustomButton
              type="reset"
              btnText="Cancle"
              variant="outline-secondary"
            />
          </div>
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Permission;
