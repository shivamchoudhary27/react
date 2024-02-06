import React from "react";
import GuestFilter from "../../filter";
import GuestUsersTable from "../../table";
import { Container } from "react-bootstrap";
import UpdateUserModal from "../../modalForm";
import PageTitle from "../../../../../../widgets/pageTitle";
import BuildPagination from "../../../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../../../widgets/breadcrumb";
import MobileHeader from "../../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../../newFooter/mobileFooter";

type Props = {
  commonProps: {
    onHide: any;
    apiStatus: any;
    modalShow: any;
    totalPages: any;
    filterUpdate: any;
    guestUserObj: {
      id: number;
      enabled: boolean;
      userEmail: string;
      userCountry: string;
      userLastName: string;
      userFirstName: string;
    };
    refreshToggle: any;
    instituteList: any;
    guestUsersData: any;
    newPageRequest: any;
    editHandlerById: any;
    toggleModalShow: any;
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
          { name: "User Management", path: "/usermanagement" },
          { name: "Guest Users", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle pageTitle="Guest User" gobacklink="/usermanagement" />
            <GuestFilter
              apiStatus={props.commonProps.apiStatus}
              updatefilters={props.commonProps.updateSearchFilters}
            />
            <GuestUsersTable
              apiStatus={props.commonProps.apiStatus}
              guestUsersData={props.commonProps.guestUsersData}
              editHandlerById={props.commonProps.editHandlerById}
              toggleModalShow={props.commonProps.toggleModalShow}
              refreshdata={props.commonProps.refreshOnDeleteToggle}
              // userPermissions={userAuthorities}
            />
            <BuildPagination
              totalpages={props.commonProps.totalPages}
              getrequestedpage={props.commonProps.newPageRequest}
              activepage={props.commonProps.filterUpdate.pageNumber}
            />
          </Container>
        </div>
      </div>
      {/* <UploadNewUsers
        show={uploadModalShow}
        onHide={() => setUploadModalShow(false)}
        setUploadModalShow={setUploadModalShow}
        updateAddRefresh={refreshToggle}
        currentInstitute={currentInstitute}
      /> */}
      <UpdateUserModal
        show={props.commonProps.modalShow}
        guestUserObj={props.commonProps.guestUserObj}
        instituteList={props.commonProps.instituteList}
        updateAddRefresh={props.commonProps.refreshToggle}
        togglemodalshow={props.commonProps.toggleModalShow}
        onHide={props.commonProps.onHide}
        // currentInstitute={currentInstitute}
      />
      <MobileFooter />
    </React.Fragment>
  );
};

export default Mobile;
