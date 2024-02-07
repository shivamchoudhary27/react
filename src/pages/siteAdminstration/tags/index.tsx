
import View from "./view";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { pagination } from "../../../utils/pagination";
import { getData as getTagsData } from "../../../adapters/microservices";

const Tags = () => {
  const dummyData = { items: [], pager: { totalElements: 0, totalPages: 0 } };
  const [modalShow, setModalShow] = useState(false);
  const [allTags, setAllTags] = useState<any>(dummyData);
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const [deleteRefresh, setDeleteRefresh] = useState<boolean>(false);
  const [tagObj, setTagObj] = useState({ id: "", name: "", published: false });
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
  const [apiStatus, setApiStatus] = useState("");
  const currentInstitute = useSelector(
    (state) => state.globalFilters.currentInstitute
  );
  const userAuthorities = useSelector(
    (state: any) => state.userAuthorities.permissions.tag
  );

  const getTags = () => {
    setApiStatus("started");
    const endPoint = `/${currentInstitute}/tags`;
    getTagsData(endPoint, filterUpdate)
      .then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          setAllTags(res.data);
        }
        setApiStatus("finished");
      })
      .catch((err: any) => {
        console.log(err);
        setApiStatus("finished");
      });
  };

  // Get tags Data from API === >>
  useEffect(() => {
    if (currentInstitute > 0) getTags();
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
        <View
        tagObj={tagObj}
        modalShow={modalShow}
        setTagObj={setTagObj}
        apiStatus={apiStatus}
        setModalShow={setModalShow}
        allTagsData={allTags.items}
        filterUpdate={filterUpdate}
        refreshToggle={refreshToggle}
        newPageRequest={newPageRequest}
        toggleModalShow={toggleModalShow}
        userAuthorities={userAuthorities}
        editHandlerById={editHandlerById}
        currentInstitute={currentInstitute}
        totalpages={allTags.pager.totalPages}
        updateInputFilters={updateInputFilters}
        updateDeleteRefresh={updateDeleteRefresh}
      />
)
};
export default Tags;
  
