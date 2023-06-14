import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { pagination } from "../../../utils/pagination";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
import Filters from "./filters";
import TagsModal from "./form";
import TagsTable from "./table";
import BuildPagination from "../../../widgets/pagination";
import { getData as getTagsData } from "../../../adapters/microservices";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import PageTitle from "../../../widgets/pageTitle";
import Errordiv from "../../../widgets/alert/errordiv";
import InstituteFilter from "../institute/instituteGlobalFilter";

const Tags = () => {
  const dummyData = { items: [], pager: { totalElements: 0, totalPages: 0 } };
  const [modalShow, setModalShow] = useState(false);
  const [allTags, setAllTags] = useState<any>(dummyData);
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const [deleteRefresh, setDeleteRefresh] = useState<boolean>(false);
  const [tagObj, setTagObj] = useState({ id: "", name: "" });
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
  const [apiStatus, setApiStatus] = useState("");
  const [currentInstitute, setCurrentInstitute] = useState<any>(0);
  const [currentInstitueName, setCurrentInstituteName] = useState<string>('');

  const updateInstituteName = (instituteName : string) => {
    setCurrentInstituteName(instituteName)
  }

  const getTags = () => {
    setApiStatus("started")
    const endPoint = `/${currentInstitute}/tags`;
    getTagsData(endPoint, filterUpdate)
      .then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          setAllTags(res.data);
        }
        setApiStatus("finished")
      })
      .catch((err: any) => {
        console.log(err);
        setApiStatus("finished")
      });
  };

  // Get tags Data from API === >>
  useEffect(() => {
    if (currentInstitute > 0)
    getTags();
  }, [refreshData, filterUpdate, currentInstitute]);

  // delete tags Data from API === >>
  useEffect(() => {
    if (deleteRefresh === true && currentInstitute > 0) {
      getTags();
    }
  }, [deleteRefresh]);

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

  // get id, name from the department table === >>>
  const editHandlerById = ({ id, name }: any) => {
    setTagObj({ id: id, name: name });
  };

  const updateDeleteRefresh = (status: boolean) => {
    setDeleteRefresh(status);
  };

  const updateInputFilters = (inputvalues: any) => {
    setFilterUpdate({ ...filterUpdate, name: inputvalues, pageNumber: 0 });
  };

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  const updateCurrentInstitute = (instituteId : number) => {
    setCurrentInstitute(instituteId);
  }

  return (
    <>
      <Header />
      <HeaderTabs activeTab="siteadmin" />
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Manage Program", path: "/manageprogram" },
          { name: "Tags", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3">
        <Container fluid>
          <div className="row gx-2 mb-3 align-items-center justify-content-center">
            <div className="col-auto">
              <label className="col-form-label">Institute: </label>
            </div>
            <div className="col-auto">
              <InstituteFilter updateCurrentInstitute={updateCurrentInstitute} updateInstituteName={updateInstituteName}/>
            </div>
          </div>
          <PageTitle pageTitle={`Tags`} gobacklink="/manageprogram" />          
          <Filters
            toggleModalShow={toggleModalShow}
            setTagObj={setTagObj}
            updateInputFilters={updateInputFilters}
          />
          <TagsModal
            show={modalShow}
            onHide={() => toggleModalShow(false)}
            togglemodalshow={toggleModalShow}
            updateAddRefresh={refreshToggle}
            tagObj={tagObj}
            currentInstitute={currentInstitute}
          />
          <TagsTable
            allTags={allTags.items}
            toggleModalShow={toggleModalShow}
            updateDeleteRefresh={updateDeleteRefresh}
            editHandlerById={editHandlerById}
            apiStatus={apiStatus}
            currentInstitute={currentInstitute}
          />
          <BuildPagination
            totalpages={allTags.pager.totalPages}
            activepage={filterUpdate.pageNumber}
            getrequestedpage={newPageRequest}
          />
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Tags;
