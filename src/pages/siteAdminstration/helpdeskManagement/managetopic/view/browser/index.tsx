import React from "react";
import ManageTopicModal from "../../form";
import ManageTopicTable from "../../table";
import Header from "../../../../../newHeader";
import Footer from "../../../../../newFooter";
import HeaderTabs from "../../../../../headerTabs";
import { Container, Button } from "react-bootstrap";
import PageTitle from "../../../../../../widgets/pageTitle";
import BuildPagination from "../../../../../../widgets/pagination";
import BreadcrumbComponent from "../../../../../../widgets/breadcrumb";
import { BackgroundWaveBottomLeft } from "../../../../../../widgets/backgroundElements";

type Props = {
  commonProps: {
    topicObj: any;
    topicData: any;
    apiStatus: any;
    modalShow: any;
    permissions: any;
    filterUpdate: any;
    topicDataPage: any;
    refreshToggle: any;
    newPageRequest: any;
    editHandlerById: any;
    setFilterUpdate: any;
    toggleModalShow: any;
    openAddTopicModal: any;
    refreshOnDeleteToggle: any;
  };
};

const Browser = (props: Props) => {
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="helpdesk" />
      <BreadcrumbComponent
        routes={[
          { name: "Dashboard", path: "/dashboard" },
          { name: "Helpdesk", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle pageTitle="Help Desk" gobacklink="/helpdeskmanagement" />
            <Button
              variant="primary"
              onClick={props.commonProps.openAddTopicModal}
            >
              Add Topic
            </Button>
            <ManageTopicTable
              topicData={props.commonProps.topicData}
              apiStatus={props.commonProps.apiStatus}
              permissions={props.commonProps.permissions}
              filterUpdate={props.commonProps.filterUpdate}
              setFilterUpdate={props.commonProps.setFilterUpdate}
              editHandlerById={props.commonProps.editHandlerById}
              toggleModalShow={props.commonProps.toggleModalShow}
              refreshdata={props.commonProps.refreshOnDeleteToggle}
            />
            <ManageTopicModal
              show={props.commonProps.modalShow}
              topicObj={props.commonProps.topicObj}
              updateAddRefresh={props.commonProps.refreshToggle}
              togglemodalshow={props.commonProps.toggleModalShow}
              onHide={() => props.commonProps.toggleModalShow(false)}
            />
            <BuildPagination
              totalpages={props.commonProps.topicDataPage}
              activepage={props.commonProps.filterUpdate.pageNumber}
              getrequestedpage={props.commonProps.newPageRequest}
            />
          </Container>
        </div>
      </div>
      <Footer />
      <BackgroundWaveBottomLeft/>
    </React.Fragment>
  );
};

export default Browser;
