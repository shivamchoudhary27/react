
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
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
 
  // call api to get all topics === >>>
  useEffect(() => {
    setApiStatus("started");
    getData("/enquiry/helpdesk", filterUpdate)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          console.log(result.data)
          setHelpdeskManagementData(result.data);
        }
        setApiStatus("finished");
      })
      .catch((err: any) => {
        console.log(err);
        setApiStatus("finished");
      });
  }, [refreshData, filterUpdate]);


  const refreshToggle = () => {
    setRefreshData(!refreshData);
  };

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

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

   // to update filters values in the main state filterUpdate
  const updateTopicFilter = (topicId: string,published: string | undefined) => {
    setFilterUpdate({
      ...filterUpdate,
      topicId: topicId,
      pageNumber: 0,
      published: published === "" ? undefined : published,
    });
  };

  const updateInputFilters = (inputvalues: any, published: any) => {
    console.log(inputvalues, '----------inputvalues');
    setFilterUpdate({
      ...filterUpdate,
      topicId: inputvalues,
      pageNumber: 0,
      published: published === "" ? undefined : published,
    });
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
      filterUpdate={filterUpdate.pageNumber}
    />
  );
};

export default Helpdeskmanagement;
