import React from "react";
import GroupModal from "../../form";
import ManageGroupTable from "../../table";
import { Container } from "react-bootstrap";
import Header from "../../../../../newHeader";
import Footer from "../../../../../newFooter";
import HeaderTabs from "../../../../../headerTabs";
import PageTitle from "../../../../../../widgets/pageTitle";
import Errordiv from "../../../../../../widgets/alert/errordiv";
import BuildPagination from "../../../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../../../widgets/breadcrumb";
import { BackgroundWaveBottomLeft } from "../../../../../../widgets/backgroundElements";

type Props = {
  commonProps: {
    name: any;
    courseid: any;
    groupObj: any;
    modalShow: any;
    programid: any;
    coursename: any;
    apiStatus: any;
    totalPages: any;
    setModalShow: any;
    filterUpdate: any;
    refreshToggle: any;
    newPageRequest: any;
    manageGroupList: any;
    userAuthorities: any;
    editHandlerById: any;
    Add_Groups_Btn: any;
    currentInstitute: any;
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
          {
            name: props.commonProps.name,
            path: `/enrolusers/${props.commonProps.programid}/${props.commonProps.name}`,
          },
          {
            name: props.commonProps.coursename,
            path: `/courseenrollment/${props.commonProps.programid}/${props.commonProps.name}/${props.commonProps.courseid}/${props.commonProps.coursename}`,
          },
          { name: "Manage Groups", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle
              pageTitle="Manage Group"
              gobacklink={`/courseenrollment/${props.commonProps.programid}/${props.commonProps.name}/${props.commonProps.courseid}/${props.commonProps.coursename}`}
            />
            {props.commonProps.userAuthorities.canAdd === true && (
              <props.commonProps.Add_Groups_Btn />
            )}
            <GroupModal
              show={props.commonProps.modalShow}
              courseid={props.commonProps.courseid}
              groupObj={props.commonProps.groupObj}
              setModalShow={props.commonProps.setModalShow}
              refreshGroupData={props.commonProps.refreshToggle}
              onHide={() => props.commonProps.setModalShow(false)}
            />
            {!props.commonProps.userAuthorities.canView ? (
              <Errordiv
                msg="You don't have permission to view group."
                cstate
                className="mt-3"
              />
            ) : (
              <React.Fragment>
                <ManageGroupTable
                  courseid={props.commonProps.courseid}
                  apiStatus={props.commonProps.apiStatus}
                  setModalShow={props.commonProps.setModalShow}
                  refreshGroupData={props.commonProps.refreshToggle}
                  editHandlerById={props.commonProps.editHandlerById}
                  userPermissions={props.commonProps.userAuthorities}
                  manageGroupList={props.commonProps.manageGroupList}
                  currentInstitute={props.commonProps.currentInstitute}
                  refreshOnDelete={props.commonProps.refreshOnDeleteToggle}
                />
                <BuildPagination
                  totalpages={props.commonProps.totalPages}
                  activepage={props.commonProps.filterUpdate}
                  getrequestedpage={props.commonProps.newPageRequest}
                />
              </React.Fragment>
            )}
          </Container>
        </div>
      </div>
      <Footer />
      <BackgroundWaveBottomLeft/>
    </React.Fragment>
  );
};

export default Browser;
