import React from "react";
import Filter from "../../filter";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import AddUserModal from "../../modalForm";
import { Container } from "react-bootstrap";
import UserManagementTable from "../../table";
import UploadNewUsers from "../../uploadUsers";
import HeaderTabs from "../../../../headerTabs";
import PageTitle from "../../../../../widgets/pageTitle";
import Errordiv from "../../../../../widgets/alert/errordiv";
import BuildPagination from "../../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";
import MobileFooter from "../../../../newFooter/mobileFooter";
import MobileHeader from "../../../../newHeader/mobileHeader";

type Props = {
  commonProps: {
    userObj: any;
    userData: any;
    apiStatus: any;
    modalShow: any;
    filterUpdate: any;
    refreshToggle: any;
    newPageRequest: any;
    toggleModalShow: any;
    editHandlerById: any;
    uploadModalShow: any;
    userAuthorities: any;
    currentInstitute: any;
    openAddUserModal: any;
    toggleUploadModal: any;
    setUploadModalShow: any;
    updateSearchFilters: any;
    refreshOnDeleteToggle: any;
  };
};

const Mobile = (props: Props) => {
  return (
    <React.Fragment>
      <MobileHeader />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "User Management", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle pageTitle="User Management" gobacklink="/siteadmin" />
            <Filter
              userPermissions={props.commonProps.userAuthorities}
              updatefilters={props.commonProps.updateSearchFilters}
              openAddUserModal={props.commonProps.openAddUserModal}
              toggleUploadModal={props.commonProps.toggleUploadModal}
            />
            {!props.commonProps.userAuthorities.user.canView ? (
              <Errordiv
                msg="You don't have permission to view users."
                cstate
                className="mt-3"
              />
            ) : (
              <React.Fragment>
                <UserManagementTable
                  apiStatus={props.commonProps.apiStatus}
                  userdata={props.commonProps.userData.items}
                  editHandlerById={props.commonProps.editHandlerById}
                  toggleModalShow={props.commonProps.toggleModalShow}
                  userPermissions={props.commonProps.userAuthorities}
                  currentInstitute={props.commonProps.currentInstitute}
                  refreshdata={props.commonProps.refreshOnDeleteToggle}
                />
                <BuildPagination
                  getrequestedpage={props.commonProps.newPageRequest}
                  activepage={props.commonProps.filterUpdate.pageNumber}
                  totalpages={props.commonProps.userData.pager.totalPages}
                />
              </React.Fragment>
            )}
          </Container>
        </div>
      </div>
      <UploadNewUsers
        show={props.commonProps.uploadModalShow}
        updateAddRefresh={props.commonProps.refreshToggle}
        currentInstitute={props.commonProps.currentInstitute}
        setUploadModalShow={props.commonProps.setUploadModalShow}
        onHide={() => props.commonProps.setUploadModalShow(false)}
      />
      <AddUserModal
        show={props.commonProps.modalShow}
        userobj={props.commonProps.userObj}
        updateAddRefresh={props.commonProps.refreshToggle}
        togglemodalshow={props.commonProps.toggleModalShow}
        currentInstitute={props.commonProps.currentInstitute}
        onHide={() => props.commonProps.toggleModalShow(false)}
      />
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
