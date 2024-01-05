
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
  const [getAllComment, setGetAllComment] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState(dummyData);
  const [helpdeskManagementData, setHelpdeskManagementData] = useState(dummyData);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    topicId: "", 
    topicName: "", 
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });

  const [repliesModalShow, setRepliesModalShow] = useState({
    status: false,
    action: "",
    topicname: "",
    dateValue: ""
  });

  const [topicObj, setTopicObj] = useState({
    id: 0,
    status: "",
    query: "",
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

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
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


  useEffect(() => {
    setApiStatus("started");
    if (selectedTopicId > 0) {
      getData(`/comment/${selectedTopicId}/allComment`, {})
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            console.log(result.data, "...............all comment ")
            setGetAllComment(result.data);
          }
          if (!repliesModalShow.status) {
            setGetAllComment([]);
          }
          setApiStatus("finished");
        })
        .catch((err: any) => {
          setApiStatus("finished");
          if(err.response.status === 500){
            console.log(err.response.data.message);
          }
        });
    }
  }, [selectedTopicId, selectedTopic, repliesModalShow.status]);

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  const toggleRepliesModalShow = ({
    status,
    action,
    topicname,
    dateValue
  }: {
    status: boolean;
    action: string;
    topicname: string,
    dateValue: any
  }) => {
    setRepliesModalShow({ status: status, action: action, topicname: topicname, dateValue: dateValue });
  };

  const getSelectedTopicId = (id: number) => {
    setSelectedTopicId(id);
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

  // get id, name from the department table === >>>
  const editHandlerById = ({ id, status,query }: any) => {
    setTopicObj({
      id: id,
      status: status,
      query: query

    });
  };
 
  return (
    <View
    topicObj={topicObj}
    modalShow={modalShow}
    apiStatus={apiStatus}
    refreshToggle={refreshToggle}
    getAllComment={getAllComment}
    newPageRequest={newPageRequest}
    selectedTopicId={selectedTopicId}
    editHandlerById={editHandlerById}
    toggleModalShow={toggleModalShow}
    selectedTopic={selectedTopic.items}
    onHide={() => toggleModalShow(false)}
    updateTopicFilter={updateTopicFilter}
    filterUpdate={filterUpdate.pageNumber}
    getSelectedTopicId={getSelectedTopicId}
    updateInputFilters={updateInputFilters}
    repliesAction={repliesModalShow.action}
    modalTitle={repliesModalShow.topicname}
    repliesModalShow={repliesModalShow.status}
    modalTitleDate={repliesModalShow.dateValue}
    toggleRepliesModalShow={toggleRepliesModalShow}
    totalPages={helpdeskManagementData.pager.totalPages}
    helpdeskManagementData={helpdeskManagementData.items}
      onRepliesHide={() =>
        toggleRepliesModalShow({ status: false, action: "", topicname: "", dateValue: ''})
      }
    />
  );
};

export default Helpdeskmanagement;
