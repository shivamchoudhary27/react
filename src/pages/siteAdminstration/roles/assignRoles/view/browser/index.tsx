import React from "react";
import Filter from "../../filter";
import { Container } from "react-bootstrap";
import Header from "../../../../../newHeader";
import Footer from "../../../../../newFooter";
import RolesDataRender from "../../assignRoles";
import HeaderTabs from "../../../../../headerTabs";
import PageTitle from "../../../../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../../../../widgets/breadcrumb";

type Props = {
  commonProps: {
    userId: any;
    apiStatus: any;
    assignRoles: any;
    btnHideStatus: any;
    getValidateUser: any;
    roleContextDatas: any;
    currentInstitute: any;
    userSelectedEmail: any;
    selectedContextIds: any;
    setUserSelectedEmail: any;
  };
};

const Browser = (props: Props) => {
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "User Management", path: "/usermanagement" },
          { name: "Assign Roles", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle
            pageTitle={`Assign Roles${
              props.commonProps.userSelectedEmail !== ""
                ? ": " + props.commonProps.userSelectedEmail
                : ""
            }`}
            gobacklink="/usermanagement"
          />
          <Filter
            getValidateUser={props.commonProps.getValidateUser}
            currentInstitute={props.commonProps.currentInstitute}
            userSelectedEmail={props.commonProps.userSelectedEmail}
            setUserSelectedEmail={props.commonProps.setUserSelectedEmail}
          />
          <RolesDataRender
            userId={props.commonProps.userId}
            apiStatus={props.commonProps.apiStatus}
            assignRoles={props.commonProps.assignRoles}
            btnHideStatus={props.commonProps.btnHideStatus}
            currentInstitute={props.commonProps.currentInstitute}
            roleContextDatas={props.commonProps.roleContextDatas}
            selectedContextIds={props.commonProps.selectedContextIds}
          />
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Browser;
