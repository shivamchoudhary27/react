import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { pagination } from "../../../utils/pagination";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
// import Sidebar from "../../sidebar";
import AddTags from "./addTags";
import TagsModal from "./tagsModal";
import TagsTable from "./tagsTable";
import BuildPagination from "../../../widgets/pagination";
import { getData as getTagsData } from "../../../adapters/microservices";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import PageTitle from "../../../widgets/pageTitle";

const Tags = () => {
  const dummyData = {items: [], pager: {totalElements: 0, totalPages: 0}}
  const [modalShow, setModalShow] = useState(false);
  const [allTags, setAllTags] = useState<any>(dummyData);
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const [deleteRefresh, setDeleteRefresh] = useState<boolean>(false);
  const [tagObj, setTagObj] = useState({ id: "", name: "" });
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
 
  const getTags = () => {
    const endPoint = `/tags`;
    getTagsData(endPoint, filterUpdate)
      .then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          setAllTags(res.data);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  // Get tags Data from API === >>
  useEffect(() => {
    getTags();
  }, [refreshData, filterUpdate]);

  // delete tags Data from API === >>
  useEffect(() => {
    if (deleteRefresh === true) {
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

  return (
    <>
      <Header />
      <HeaderTabs activeTab="siteadmin"/>
      <BreadcrumbComponent
            routes={[
              { name: "Site Administration", path: "/siteadmin" },
              { name: "Manage Program", path: "/manageprogram" },
              { name: "Tags", path: "" },
            ]}
          />
      <div className="contentarea-wrapper mt-3">
          <Container fluid>     
          <PageTitle 
            pageTitle = "Tags" gobacklink = "/manageprogram"
          />       
            <AddTags
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
            />
            <TagsTable
              allTags={allTags.items}
              toggleModalShow={toggleModalShow}
              updateDeleteRefresh={updateDeleteRefresh}
              editHandlerById={editHandlerById}
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
