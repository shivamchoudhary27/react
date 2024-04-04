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
import BottomWave from "../../../../../assets/images/background/bg-bottom.svg";
import bgLeft from "../../../../../assets/images/background/bg-admin-left.svg";

type Props = {
  commonProps: {
    userObj: any;
    userData: any;
    apiStatus: any;
    modalShow: any;
    filterUpdate: any;
    refreshToggle: any;
    setFilterUpdate:any;
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

const Browser = (props: Props) => {
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "User Management", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle="User Management" gobacklink="/siteadmin" />
          <Filter
            apiStatus={props.commonProps.apiStatus}
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
                setFilterUpdate={props.commonProps.setFilterUpdate}
                filterUpdate={props.commonProps.filterUpdate}
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
      <Footer />
      <div className="position-relative">
        <img src={bgLeft} className="left-cicle" alt="left-cicle" />
        </div>
      <div className="bottom-bg">
        <img src={BottomWave} alt="bottom wave" />
      </div>
    </React.Fragment>
  );
};

export default Browser;
