import React from "react";
import UserFilter from "../../userFilter";
import UsersTable from "../../usersTable";
import Header from "../../../../newHeader";
import Footer from "../../../../newFooter";
import { Container } from "react-bootstrap";
import AddUsersModal from "../../addUsersModal";
import HeaderTabs from "../../../../headerTabs";
import UploadUsersEnrollment from "../../uploadUsers";
import PageTitle from "../../../../../widgets/pageTitle";
import BuildPagination from "../../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../../widgets/breadcrumb";

type Props = {
  commonProps: {
    apiStatus: any;
    programid: any;
    programId: any;
    modalShow: any;
    totalpages: any;
    programname: any;
    usersDataObj: any;
    filterUpdate: any;
    refreshToggle: any;
    newPageRequest: any;
    usersModalShow: any;
    toggleModalShow: any;
    editHandlerById: any;
    enrolleduserdata: any;
    currentInstitute: any;
    AddUsersModalShow: any;
    updateinputfilters: any;
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
          { name: "Program Enrollment", path: "/programenrollment" },
          { name: props.commonProps.programname, path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle
              pageTitle={`Program: <span>${props.commonProps.programname}</span>`}
              gobacklink="/programenrollment"
            />
            <UserFilter
              apiStatus={props.commonProps.apiStatus}
              programname={props.commonProps.programname}
              toggleModalShow={props.commonProps.toggleModalShow}
              AddUsersModalShow={props.commonProps.AddUsersModalShow}
              updateinputfilters={props.commonProps.updateinputfilters}
            />
            <UsersTable
              apiStatus={props.commonProps.apiStatus}
              programname={props.commonProps.programname}
              programid={props.commonProps.programid}
              enrolleduserdata={props.commonProps.enrolleduserdata}
              editHandlerById={props.commonProps.editHandlerById}
              refreshdata={props.commonProps.refreshOnDeleteToggle}
              AddUsersModalShow={props.commonProps.AddUsersModalShow}
            />

            <BuildPagination
              totalpages={props.commonProps.totalpages}
              activepage={props.commonProps.filterUpdate}
              getrequestedpage={props.commonProps.newPageRequest}
            />
          </Container>
        </div>
      </div>
      <UploadUsersEnrollment
        programid={props.commonProps.programId}
        show={props.commonProps.modalShow}
        togglemodalshow={props.commonProps.toggleModalShow}
        updateAddRefresh={props.commonProps.refreshToggle}
        onHide={() => props.commonProps.toggleModalShow(false)}
      />
      <AddUsersModal
        show={props.commonProps.usersModalShow}
        usersdataobj={props.commonProps.usersDataObj}
        refreshToggle={props.commonProps.refreshToggle}
        currentInstitute={props.commonProps.currentInstitute}
        addusersmodalshow={props.commonProps.AddUsersModalShow}
        onHide={() => props.commonProps.AddUsersModalShow(false)}
      />
      <Footer />
    </React.Fragment>
  );
};

export default Browser;
