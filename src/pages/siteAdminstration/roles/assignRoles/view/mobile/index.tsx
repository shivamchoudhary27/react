import React from "react";
import Filter from "../../filter";
import { Container } from "react-bootstrap";
import RolesDataRender from "../../assignRoles";
import PageTitle from "../../../../../../widgets/pageTitle";
import MobileHeader from "../../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../../newFooter/mobileFooter";
import BreadcrumbComponent from "../../../../../../widgets/breadcrumb";
import "./mobileStyle.scss";

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

const Mobile = (props: Props) => {
  return (
    <React.Fragment>
      <MobileHeader />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "User Management", path: "/usermanagement" },
          { name: "Assign Roles", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
          <div className="role-title">
          <PageTitle
              pageTitle={`Assign Roles${
                props.commonProps.userSelectedEmail !== ""
                  ? ": " + props.commonProps.userSelectedEmail
                  : ""
              }`}
              gobacklink="/usermanagement"
            />
          </div>
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
      </div>
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
