import React from "react";
import TagsModal from "../../form";
import TagsTable from "../../table";
import Filters from "../../filters";
import { Container } from "react-bootstrap";
import PageTitle from "../../../../../widgets/pageTitle";
import MobileHeader from "../../../../newHeader/mobileHeader";
import MobileFooter from "../../../../newFooter/mobileFooter";
import BuildPagination from "../../../../../widgets/pagination";

type Props = {
  commonProps: {
    tagObj: any;
    setTagObj: any;
    apiStatus: any;
    modalShow: any;
    totalpages: any;
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
  }
};

const Browser = (props: Props) => {
  return (
    <React.Fragment>
      <MobileHeader />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle={`Tags`} gobacklink="/manageprogram" />
          <Filters
            apiStatus={props.commonProps.apiStatus}
            setTagObj={props.commonProps.setTagObj}
            userPermissions={props.commonProps.userAuthorities}
            toggleModalShow={props.commonProps.toggleModalShow}
            updateInputFilters={props.commonProps.updateInputFilters}
          />
          <TagsModal
            tagObj={props.commonProps.tagObj}
            show={props.commonProps.modalShow}
            updateAddRefresh={props.commonProps.refreshToggle}
            togglemodalshow={props.commonProps.toggleModalShow}
            currentInstitute={props.commonProps.currentInstitute}
            onHide={() => props.commonProps.toggleModalShow(false)}
          />
          <TagsTable
            apiStatus={props.commonProps.apiStatus}
            allTags={props.commonProps.allTagsData}
            userPermissions={props.commonProps.userAuthorities}
            toggleModalShow={props.commonProps.toggleModalShow}
            editHandlerById={props.commonProps.editHandlerById}
            currentInstitute={props.commonProps.currentInstitute}
            updateDeleteRefresh={props.commonProps.updateDeleteRefresh}
          />
          <BuildPagination
            totalpages={props.commonProps.totalpages}
            getrequestedpage={props.commonProps.newPageRequest}
            activepage={props.commonProps.filterUpdate.pageNumber}
          />
        </Container>
      </div>
      <MobileFooter />
    </React.Fragment>
  );
};

export default Browser;
