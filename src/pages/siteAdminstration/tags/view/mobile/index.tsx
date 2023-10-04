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

const Browser = (commonProps: Props) => {
  return (
    <React.Fragment>
      <MobileHeader />
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
          <PageTitle pageTitle={`Tags`} gobacklink="/manageprogram" />
          <Filters
            apiStatus={commonProps.apiStatus}
            setTagObj={commonProps.setTagObj}
            userPermissions={commonProps.userAuthorities}
            toggleModalShow={commonProps.toggleModalShow}
            updateInputFilters={commonProps.updateInputFilters}
          />
          <TagsModal
            tagObj={commonProps.tagObj}
            show={commonProps.modalShow}
            updateAddRefresh={commonProps.refreshToggle}
            togglemodalshow={commonProps.toggleModalShow}
            currentInstitute={commonProps.currentInstitute}
            onHide={() => commonProps.toggleModalShow(false)}
          />
          <TagsTable
            apiStatus={commonProps.apiStatus}
            allTags={commonProps.allTagsData.items}
            userPermissions={commonProps.userAuthorities}
            toggleModalShow={commonProps.toggleModalShow}
            editHandlerById={commonProps.editHandlerById}
            currentInstitute={commonProps.currentInstitute}
            updateDeleteRefresh={commonProps.updateDeleteRefresh}
          />
          <BuildPagination
            getrequestedpage={commonProps.newPageRequest}
            activepage={commonProps.filterUpdate.pageNumber}
            totalpages={commonProps.allTagsData.pager.totalPages}
          />
        </Container>
      </div>
      <MobileFooter />
    </React.Fragment>
  );
};

export default Browser;
