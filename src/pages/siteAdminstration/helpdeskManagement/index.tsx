import View from "./view";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { pagination } from "../../../utils/pagination";
import { getData } from "../../../adapters/microservices";

const Helpdeskmanagement = () => {
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const [apiStatus, setApiStatus] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [refreshData, setRefreshData] = useState(true);
  const [getAllComment, setGetAllComment] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState(0);
  const [queryModalShow, setQueryModalShow] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(dummyData);
  const [getAllProgram, setGetAllProgram] = useState(dummyData);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });
  const [helpdeskManagementData, setHelpdeskManagementData] =useState(dummyData);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    sortBy: "",
    sortOrder: "",
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });

  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );

  const [repliesModalShow, setRepliesModalShow] = useState({
    status: false,
    action: "",
    topicname: "",
    dateValue: "",
  });

  const [topicObj, setTopicObj] = useState({
    id: 0,
    status: "",
    query: "",
  });

  const [queryObj, setQueryObj] = useState({
    queryId : 0,
    query: ""
  });

  // call api to get all enquiry helpdesk management === >>>
  useEffect(() => {
    setApiStatus("started");
    getData("/enquiry/helpdesk", filterUpdate)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
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

  // handle modal hide & show functionality for queryModalForm === >>>
  const toggleQueryModalShow = (status: boolean) => {
    setQueryModalShow(status);
  };

  // call api to get all topics === >>>
  useEffect(() => {
    setApiStatus("started");
    getData("/topic", filterUpdate)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          setSelectedTopic(result.data);
        }
        setApiStatus("finished");
      })
      .catch((err: any) => {
        console.log(err);
        setApiStatus("finished");
      });
  }, [refreshData, filterUpdate]);

  useEffect(() => {
    if (selectedTopicId > 0) {
      setApiStatus("started");
      getData(`/comment/${selectedTopicId}/allComment`, {})
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            setGetAllComment(result.data);
          }
          if (!repliesModalShow.status) {
            setApiStatus("finished");
            setGetAllComment([]);
          }
          setApiStatus("finished");
        })
        .catch((err: any) => {
          console.log(err);
          if (err.response.status === 500) {
            setApiStatus("finished");
            setGetAllComment([]);
            setAlertMsg({
              message: err.response.data.message,
              alertBoxColor: "alert-danger",
            });
          }
        });
    }
  }, [selectedTopicId, selectedTopic, repliesModalShow.status]);

  // call api to get all programs === >>>
  useEffect(() => {
    if (modalShow === true) {
    setApiStatus("started");
    getData(`/${currentInstitute}/programs`, {
      pageNumber: 0,
      pageSize: pagination.PERPAGE,
    })
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          setGetAllProgram(result.data);
        }
        setApiStatus("finished");
      })
      .catch((err: any) => {
        console.log(err);
        setApiStatus("finished");
      });
    }
  }, [modalShow]);

  const newPageRequest = (pageRequest: number) => {
    setFilterUpdate({ ...filterUpdate, pageNumber: pageRequest });
  };

  const toggleRepliesModalShow = ({
    status,
    action,
    topicname,
    dateValue,
  }: {
    status: boolean;
    action: string;
    topicname: string;
    dateValue: any;
  }) => {
    setRepliesModalShow({
      status: status,
      action: action,
      topicname: topicname,
      dateValue: dateValue,
    });
  };
  
  const getSelectedTopicId = (id: number) => {
    setSelectedTopicId(id);
  };

  // to update filters values in the main state filterUpdate
  const updateTopicFilter = (
    topicId: string,
    published: string | undefined,
    startDate: any,
    endDate: any,
    programId: string
  ) => {
    setFilterUpdate({
      ...filterUpdate,
      pageNumber: 0,
      topicId: topicId === "" ? undefined : topicId,
      published: published === "" ? undefined : published,
      startDate: startDate === "" ? undefined : startDate,
      endDate: endDate === "" ? undefined : endDate,
      programId: programId === "" ? undefined : programId,
    });
  };

  // get id, name from the department table === >>>
  const editHandlerById = ({ id, status, query }: any) => {
    setTopicObj({
      id: id,
      status: status,
      query: query,
    });
  };

   // get queryId, query name from the table === >>>
  const editHandlerByQueryId = ({queryId, query}: any) => {
    setQueryObj({
      queryId : queryId, 
      query : query
    })
  }

  return (
    <View
      queryObj={queryObj}
      topicObj={topicObj}
      apiStatus={apiStatus}
      showAlert={showAlert}
      modalShow={modalShow}
      alertMsg={setAlertMsg}
      setShowAlert={setShowAlert}
      filterUpdate={filterUpdate}
      refreshToggle={refreshToggle}
      getAllComment={getAllComment}
      queryModalShow={queryModalShow}
      newPageRequest={newPageRequest}
      filterUpdateTable={filterUpdate}
      setFilterUpdate={setFilterUpdate}
      selectedTopicId={selectedTopicId}
      editHandlerById={editHandlerById}
      toggleModalShow={toggleModalShow}
      setGetAllComment={setGetAllComment}
      getAllProgram={getAllProgram.items}
      selectedTopic={selectedTopic.items}
      onHide={() => toggleModalShow(false)}
      updateTopicFilter={updateTopicFilter}
      getSelectedTopicId={getSelectedTopicId}
      repliesAction={repliesModalShow.action}
      modalTitle={repliesModalShow.topicname}
      repliesModalShow={repliesModalShow.status}
      editHandlerByQueryId={editHandlerByQueryId}
      modalTitleDate={repliesModalShow.dateValue}
      toggleQueryModalShow={toggleQueryModalShow}
      toggleRepliesModalShow={toggleRepliesModalShow}
      onQueryHide={() => toggleQueryModalShow(false)}
      totalPages={helpdeskManagementData.pager.totalPages}
      helpdeskManagementData={helpdeskManagementData.items}
      onRepliesHide={() =>
        toggleRepliesModalShow({ status: false, action: "", topicname: "", dateValue: "" })
      }
    />
  );
};

export default Helpdeskmanagement;

