import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
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

const Tags = () => {
  const dummyData = { items: [], pager: { totalElements: 0, totalPages: 0 } };
  const [modalShow, setModalShow] = useState(false);
  const [allTags, setAllTags] = useState<any>(dummyData);
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const [deleteRefresh, setDeleteRefresh] = useState<boolean>(false);
  const [tagObj, setTagObj] = useState({ id: "", name: "",published: false });
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
  const [apiStatus, setApiStatus] = useState("");
  const currentInstitute = useSelector(state => state.globalFilters.currentInstitute);

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
  const editHandlerById = ({ id, name, published }: any) => {
    setTagObj({ id: id, name: name, published: published });
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
      <div className="contentarea-wrapper mt-3 mb-5">
        <Container fluid>
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
