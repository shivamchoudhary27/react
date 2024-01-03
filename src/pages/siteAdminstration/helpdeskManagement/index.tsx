
import View from "./view";
import { useEffect, useState } from "react";
import { pagination } from "../../../utils/pagination";
import { getData } from "../../../adapters/microservices";

const Helpdeskmanagement = () => {
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const [apiStatus, setApiStatus] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [refreshData, setRefreshData] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(dummyData);
  const [helpdeskManagementData, setHelpdeskManagementData] = useState(dummyData);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    topicId: "", 
    topicName: "", 
    published: "", 
    date: "",
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
 

  // call api to get all topics === >>>
  useEffect(() => {
    setApiStatus("started");
    getData("/enquiry/helpdesk", filterUpdate)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          // console.log(result.data)
          setHelpdeskManagementData(result.data);
        }
        setApiStatus("finished");
      })
      .catch((err: any) => {
        console.log(err);
        setApiStatus("finished");
      });
  }, [refreshData, filterUpdate]);


   // call api to get all topics === >>>
   useEffect(() => {
    setApiStatus("started");
    getData("/topic", filterUpdate)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          console.log(result.data);
          setSelectedTopic(result.data);
        }
        setApiStatus("finished");
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [refreshData, filterUpdate]);

  // console.log(helpdeskManagementData)


  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

   // to update filters values in the main state filterUpdate
   const updateTopicFilter = (topicId: string, published:Boolean) => {
    setFilterUpdate({
      ...filterUpdate,
      topicId: topicId,
      pageNumber: 0,
      published: published,
    });
  };

  console.log(filterUpdate)

  const updateInputFilters = (inputvalues: any) => {
    setFilterUpdate({ ...filterUpdate, topicName: inputvalues, pageNumber: 0 });
  };
 
  return (
    <View
      selectedTopic={selectedTopic.items}
      apiStatus={apiStatus}
      newPageRequest={newPageRequest}
      updateTopicFilter={updateTopicFilter}
      updateInputFilters={updateInputFilters}
      helpdeskManagementData={helpdeskManagementData.items}
      totalPages={helpdeskManagementData.pager.totalPages}
      // modalShow={modalShow}
      // permissions={permissions}
      filterUpdate={filterUpdate.pageNumber}

    // toggleRepliesModalShow: props.toggleRepliesModalShow,
    />
  );
};

export default Helpdeskmanagement;
