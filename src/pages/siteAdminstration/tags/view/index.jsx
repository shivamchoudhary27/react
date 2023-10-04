import React from "react";
import Mobile from "./mobile";
import Browser from "./browser";
// import Header from "../../../../newHeader";
// import Footer from "../../../../newFooter";
// import { Container } from "react-bootstrap";
// import HeaderTabs from "../../../../headerTabs";
// import PageTitle from "../../../../../widgets/pageTitle";
import { isMobile, isDesktop } from "react-device-detect";
// import BreadcrumbComponent from "../../../../../widgets/breadcrumb";


type Props = {
  tagObj: any;
  setTagObj: any;
  apiStatus: any;
  modalShow: any;
  allTagsData: any;
  filterUpdate: any;
  setModalShow: any;
  refreshToggle: any;
  newPageRequest: any;
  toggleModalShow: any;
  editHandlerById: any;
  userAuthorities: any;
  currentInstitute: any;
  updateInputFilters: any;
  updateDeleteRefresh: any;
};

const View = (props: Props) => {
  const commonProps = {
    tagObj: props.tagObj,
    setTagObj: props.setTagObj,
    apiStatus: props.apiStatus,
    modalShow: props.modalShow,
    allTagsData: props.allTagsData,
    filterUpdate: props.filterUpdate,
    setModalShow: props.setModalShow,
    refreshToggle: props.refreshToggle,
    newPageRequest: props.newPageRequest,
    toggleModalShow: props.toggleModalShow,
    userAuthorities: props.userAuthorities,
    editHandlerById: props.editHandlerById,
    currentInstitute: props.currentInstitute,
    updateInputFilters: props.updateInputFilters,
    updateDeleteRefresh: props.updateDeleteRefresh,
  };

  return (
    <React.Fragment>
      {/* <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Manage Program", path: "/manageprogram" },
          { name: "Tags", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle={`Tags`} gobacklink="/manageprogram" />
          <Filters
            apiStatus={apiStatus}
            userPermissions={userAuthorities}
            setTagObj={setTagObj}
            toggleModalShow={toggleModalShow}
            updateInputFilters={updateInputFilters}
          />
          <TagsModal
            tagObj={tagObj}
            show={modalShow}
            currentInstitute={currentInstitute}
            updateAddRefresh={refreshToggle}
            togglemodalshow={toggleModalShow}
            onHide={() => toggleModalShow(false)}
          />
          <TagsTable
            apiStatus={apiStatus}
            allTags={allTags.items}
            userPermissions={userAuthorities}
            currentInstitute={currentInstitute}
            toggleModalShow={toggleModalShow}
            editHandlerById={editHandlerById}
            updateDeleteRefresh={updateDeleteRefresh}
          />
          <BuildPagination
            activepage={filterUpdate.pageNumber}
            totalpages={allTags.pager.totalPages}
            getrequestedpage={newPageRequest}
          />
        </Container>
      </div>
      <Footer /> */}

      {isMobile ? (
        <Mobile commonProps={commonProps} />
      ) : isDesktop ? (
        <Browser commonProps={commonProps} />
      ) : (
        <Browser commonProps={commonProps} />
      )}
    </React.Fragment>
  );
};

export default View;
