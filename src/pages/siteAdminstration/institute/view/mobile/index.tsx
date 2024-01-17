import React from "react";
import Filter from "../../filter";
import AddUserModal from "../../modalForm";
import ConfigModal from "../../configModal";
import { Container } from "react-bootstrap";
import UserManagementTable from "../../table";
import UploadNewUsers from "../../uploadUsers";
import PageTitle from "../../../../../widgets/pageTitle";
import MobileHeader from "../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../newFooter/mobileFooter";
import BuildPagination from "../../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";

type Props = {
  commonProps: {
    userObj: any;
    userData: any;
    apiStatus: any;
    modalShow: any;
    permissions: any;
    configModal: any;
    filterUpdate: any;
    userDataPage: any;
    refreshToggle: any;
    newPageRequest: any;
    permissionsView: any;
    uploadModalShow: any;
    editHandlerById: any;
    toggleModalShow: any;
    configModalShow: any;
    openAddUserModal: any;
    editConfigHandler: any;
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
          { name: "Institute Management", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle
              pageTitle="Institute Management"
              gobacklink="/siteadmin"
            />
            <Filter
              apiStatus={props.commonProps.apiStatus}
              permissions={props.commonProps.permissions}
              updatefilters={props.commonProps.updateSearchFilters}
              openAddUserModal={props.commonProps.openAddUserModal}
              toggleUploadModal={props.commonProps.toggleUploadModal}
            />
            {props.commonProps.permissionsView && (
              <>
                <UserManagementTable
                  userdata={props.commonProps.userData}
                  apiStatus={props.commonProps.apiStatus}
                  permissions={props.commonProps.permissions}
                  editHandlerById={props.commonProps.editHandlerById}
                  toggleModalShow={props.commonProps.toggleModalShow}
                  configModalShow={props.commonProps.configModalShow}
                  refreshdata={props.commonProps.refreshOnDeleteToggle}
                  editConfigHandler={props.commonProps.editConfigHandler}
                />
                <BuildPagination
                  totalpages={props.commonProps.userDataPage}
                  activepage={props.commonProps.filterUpdate}
                  getrequestedpage={props.commonProps.newPageRequest}
                />
              </>
            )}
          </Container>
        </div>
      </div>
      <UploadNewUsers
        show={props.commonProps.uploadModalShow}
        updateAddRefresh={props.commonProps.refreshToggle}
        setUploadModalShow={props.commonProps.setUploadModalShow}
        onHide={() => props.commonProps.setUploadModalShow(false)}
      />
      <AddUserModal
        show={props.commonProps.modalShow}
        userobj={props.commonProps.userObj}
        updateAddRefresh={props.commonProps.refreshToggle}
        togglemodalshow={props.commonProps.toggleModalShow}
        onHide={() => props.commonProps.toggleModalShow(false)}
      />
      <ConfigModal
        userobj={props.commonProps.userObj}
        show={props.commonProps.configModal}
        updateAddRefresh={props.commonProps.refreshToggle}
        configModalShow={props.commonProps.configModalShow}
        editConfigHandler={props.commonProps.editConfigHandler}
        onHide={() => props.commonProps.configModalShow(false)}
      />
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
